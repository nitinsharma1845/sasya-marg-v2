import { Farmer } from '../models/farmer.model.js'
import mongoose from "mongoose"
import { ApiError } from '../utils/apiError.js'
import { verifyOtpService } from './otp.service.js'
import { generateToken } from '../utils/generateToken.js'
import { verifyPassword } from '../utils/verifyPassword.js'
import { FarmLand } from '../models/farmLand.model.js'
import { Product } from "../models/product.model.js"
import { PreHarvestListing } from '../models/preHarvetedListing.model.js'
import { PredictHistory } from "../models/predictHistory.model.js"
import { Admin } from '../models/admin.model.js'
import { Buyer } from '../models/buyer.model.js'
import { Query } from '../models/query.model.js'

export const registerFarmerService = async ({ fullname, phone, otp, password }) => {
    const [farmerExist, AdminExist, buyerExist] = await Promise.all([
        Farmer.findOne({ phone }),
        Admin.findOne({ phone }),
        Buyer.findOne({ phone }),
    ])
    if (farmerExist || AdminExist || buyerExist) throw new ApiError(409, "Phone Number is already in use ")

    await verifyOtpService({ phone, otp, purpose: "register" })

    const farmerDoc = await Farmer.create({
        fullname,
        phone,
        password,
        isVarified: true,
        role: "farmer",
    })

    const token = generateToken({ _id: farmerDoc._id, role: "farmer", isActive: farmerDoc.isActive })

    const farmer = {
        fullname: farmerDoc.fullname,
        email: farmerDoc.email,
        role: farmerDoc.role,
        phone: farmerDoc.phone,
        _id: farmerDoc._id,
        token: token

    }

    return { farmer, token }
}

export const loginFarmerUsingOtpService = async ({ phone, otp }) => {
    const farmerDoc = await Farmer.findOne({ phone })

    if (!farmerDoc) throw new ApiError(404, "Farmer is not registered yet")

    await verifyOtpService({ otp, purpose: "login", phone })

    const token = generateToken({ _id: farmerDoc._id, role: "farmer", isActive: farmerDoc.isActive })

    const farmer = {
        fullname: farmerDoc.fullname,
        email: farmerDoc.email,
        role: farmerDoc.role,
        phone: farmerDoc.phone,
        _id: farmerDoc._id,
        token: token

    }

    return { farmer, token }


}

export const loginFarmerUsingPasswordService = async ({ phone, password }) => {
    const farmerDoc = await Farmer.findOne({ phone }).select("+password")

    if (!farmerDoc) throw new ApiError(404, "Farmer is not registered yet")

    const isVarified = await verifyPassword(password, farmerDoc.password)

    if (!isVarified) throw new ApiError(401, "Invalid credentials")

    const token = generateToken({ _id: farmerDoc._id, role: "farmer", isActive: farmerDoc.isActive })

    const farmer = {
        fullname: farmerDoc.fullname,
        email: farmerDoc.email,
        role: farmerDoc.role,
        phone: farmerDoc.phone,
        _id: farmerDoc._id,
        token: token

    }

    return { farmer, token }
}

export const forgotPasswordService = async ({ phone, otp, newPassword }) => {
    const farmer = await Farmer.findOne({ phone }).select("+password")

    if (!farmer) {
        throw new ApiError(404, "Farmer not found")
    }
    await verifyOtpService({ otp, purpose: "forgot_password", phone })

    farmer.password = newPassword
    await farmer.save()
    const farmerObj = farmer.toJSON()
    delete farmerObj?.password
    return { farmer: farmerObj }
}

export const changePasswordService = async ({ oldPassword, newPassword, _id }) => {
    const farmer = await Farmer.findById(_id).select("+password")

    if (!farmer) {
        throw new ApiError(404, "Farmer not found")
    }

    if (farmer.isActive === false) {
        throw new ApiError(403, "Account is deactivated")
    }

    const validOldPassword = await verifyPassword(oldPassword, farmer.password)

    if (!validOldPassword) throw new ApiError(401, "Old password is Incorrect")

    const isNewPasswordIsSame = await verifyPassword(newPassword, farmer.password)
    if (isNewPasswordIsSame) {
        throw new ApiError(
            400,
            "New password must be different from old password"
        )
    }

    farmer.password = newPassword
    await farmer.save()

    return true

}

export const currentUserService = async ({ req }) => {
    const farmer = await Farmer.findOne({ _id: req.user._id })
    return { farmer }
}

export const toggleContactInfoService = async ({ _id }) => {
    const farmer = await Farmer.findById(_id)

    if (!farmer) {
        throw new ApiError(404, "Farmer not found")
    }

    if (farmer.isActive === false) {
        throw new ApiError(403, "Account is deactivated")
    }

    farmer.isContactVisible = !farmer.isContactVisible
    await farmer.save()

    return farmer.isContactVisible

}

export const changeFarmerDataService = async ({ fullname, _id }) => {
    const farmer = await Farmer.findByIdAndUpdate(
        _id,
        { fullname },
        { new: true }
    )

    if (!farmer) {
        throw new ApiError(404, "Farmer not found")
    }

    return farmer
}

export const changeEmailService = async ({ email, otp, farmerId }) => {
    const farmer = await Farmer.findById(farmerId)
    const [existBuyer, existFarmer, existAdmin] = await Promise.all([
        Buyer.findOne({ email }),
        Farmer.findOne({ email }),
        Admin.findOne({ email })
    ])

    if (existBuyer || existFarmer || existAdmin) {
        throw new ApiError(402, "Email is already in use")
    }

    farmer.email = email
    await farmer.save()

    return farmer
}


export const farmerDashboardService = async (farmerId) => {
    const farmerObjectId = new mongoose.Types.ObjectId(farmerId)

    const farmer = await Farmer.findById(farmerId)
        .select("fullname phone email address")

    if (!farmer) throw new ApiError(404, "Farmer not found")

    const [
        farmlandContext,
        productCount,
        predictionCount,
        queriesCount,
        recentListings,
        recentPredictions,
        recentQueries
    ] = await Promise.all([

        FarmLand.aggregate([
            { $match: { owner: farmerObjectId } },

            {
                $lookup: {
                    from: "locations",
                    localField: "location",
                    foreignField: "_id",
                    as: "location"
                }
            },
            { $unwind: "$location" },

            {
                $lookup: {
                    from: "weathers",
                    localField: "location._id",
                    foreignField: "location",
                    as: "weather"
                }
            },
            {
                $addFields: {
                    weather: {
                        $arrayElemAt: [
                            {
                                $slice: [
                                    {
                                        $sortArray: {
                                            input: "$weather",
                                            sortBy: { createdAt: -1 }
                                        }
                                    },
                                    1
                                ]
                            },
                            0
                        ]
                    }
                }
            },

            {
                $unwind: {
                    path: "$weather",
                    preserveNullAndEmptyArrays: true
                }
            },

            {
                $project: {
                    name: 1,
                    size: 1,
                    soilType: 1,
                    location: {
                        name: 1,
                        district: 1,
                        state: 1,
                        latitude: 1,
                        longitude: 1
                    },
                    weather: {
                        temperature: 1,
                        humidity: 1,
                        rainfall: 1,
                        condition: 1,
                        fetchedAt: 1
                    }
                }
            }
        ]),

        Product.countDocuments({ farmer: farmerId }),

        PredictHistory.countDocuments({ farmer: farmerId }),

        Query.countDocuments({ farmer: farmerId }),

        PreHarvestListing.find({ farmer: farmerId })
            .sort({ createdAt: -1 })
            .limit(5)
            .select("crop expectedHarvest status createdAt"),

        PredictHistory.find({ farmer: farmerId })
            .sort({ createdAt: -1 })
            .limit(1)
            .populate({
                path: "result.cropId",
                select: "name"
            }),

        Query.find({ farmer: farmerId })
            .sort({ createdAt: -1 })
            .limit(2)
            .select("status inquiry subject")
    ])

    return {
        profile: farmer,

        stats: {
            farmlandCount: farmlandContext.length,
            productCount,
            preHarvestCount: recentListings.length,
            queriesCount,
            predictionCount,
            contactCount: 0 // future
        },

        farmlands: farmlandContext,

        recent: {
            listings: recentListings,
            predictions: recentPredictions,
            queries: recentQueries
        }
    }
}
