import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/apiResponse.js'
import { loginBuyerUsingOtpService, loginBuyerUsingPasswordService, registerBuyerService, forgotBuyerPasswordService, changeBuyerPasswordService, currentUserService, updateBuyerAddressService, buyerDashboardSevice, getSingleProductService, changeBuyerProfileService } from '../services/buyer.service.js'
import { getPreHarvestListingService, getSinglePreHarvestProductForBuyer } from '../services/preHarvestListing.service.js'
import { getProductListingService } from '../services/product.service.js'



export const registerBuyer = asyncHandler(async (req, res) => {
    const { fullname, phone, otp, password, email } = req.body

    const { buyer, token } = await registerBuyerService({ fullname, phone, otp, password, email })

    req.activityLog = {
        userId: buyer._id,
        role: "buyer",
        action: "ACCOUNT_CREATED",
        message: "Account creation done for buyer role.",
        metadata: {
            id: buyer._id,
            fullname: buyer.fullname,
            phone: buyer.phone
        }
    }

    res
        .cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", maxAge: 100 * 60 * 60 * 24 * 7 })
        .status(201)
        .json(new ApiResponse(201, buyer, "Buyer registered successfully"))
})

export const loginBuyerWithPassword = asyncHandler(async (req, res) => {
    const { password, identifier } = req.body

    const { buyer, token } = await loginBuyerUsingPasswordService({ password, identifier })

    req.activityLog = {
        userId: buyer._id,
        role: "buyer",
        action: "LOGIN",
        message: "Account Loggedin by buyer role.",
        metadata: {
            method: "PASSWORD",
            id: buyer._id,
            fullname: buyer.fullname,
            phone: buyer.phone
        }
    }

    res
        .cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", maxAge: 100 * 60 * 60 * 24 * 7 })
        .status(200)
        .json(new ApiResponse(200, buyer, "Buyer loggedin successfully"))

})

export const loginBuyerWithOtp = asyncHandler(async (req, res) => {
    const { otp, phone } = req.body

    const { token, buyer } = await loginBuyerUsingOtpService({ otp, phone })

    req.activityLog = {
        userId: buyer._id,
        role: "buyer",
        action: "LOGIN",
        message: "Account Loggedin by buyer role.",
        metadata: {
            id: buyer._id,
            fullname: buyer.fullname,
            phone: buyer.phone,
            method: "OTP"
        }
    }

    res
        .cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", maxAge: 100 * 60 * 60 * 24 * 7 })
        .status(200)
        .json(new ApiResponse(200, buyer, "Buyer loggedin successfully"))
})

export const forgotPassword = asyncHandler(async (req, res) => {
    const { otp, phone, newPassword } = req.body

    const { buyer } = await forgotBuyerPasswordService({ otp, phone, newPassword })

    req.activityLog = {
        userId: buyer._id,
        role: "buyer",
        action: "FORGOT_PASSWORD",
        message: "Forgot password request from buyer role.",
        metadata: {
            id: buyer._id,
            fullname: buyer.fullname,
            phone: buyer.phone
        }
    }

    return res.status(200).json(new ApiResponse(200, buyer, "Password changed successfully"))
})

export const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body
    const buyerId = req.user._id


    const buyer = await changeBuyerPasswordService({ oldPassword, newPassword, _id: buyerId })

    req.activityLog = {
        userId: buyer._id,
        role: "buyer",
        action: "RESET_PASSWORD",
        message: "password reset request from buyer role.",
        metadata: {
            id: buyer._id,
            fullname: buyer.fullname,
            phone: buyer.phone
        }
    }

    return res.status(200).json(new ApiResponse(200, buyer, "Password Changed Successfully"))
})

export const currentUser = asyncHandler(async (req, res) => {
    const buyerId = req.user._id

    const buyer = await currentUserService({ buyerId })

    return res.status(200).json(new ApiResponse(200, buyer, "User Fetched successfully"))
})

export const updateBuyerAddress = asyncHandler(async (req, res) => {

    const address = req.body.address
    const buyerId = req.user._id

    const buyer = await updateBuyerAddressService({ buyerId, address })

    req.activityLog = {
        userId: buyer._id,
        role: "buyer",
        action: "UPDATE_ADDRESS",
        message: "Update address request from buyer.",
        metadata: {
            id: buyer._id,
            fullname: buyer.fullname,
            phone: buyer.phone
        }
    }

    return res.status(200).json(new ApiResponse(200, buyer, "Address updated"))
})

export const updateBuyerProfile = asyncHandler(async (req, res) => {
    const buyerId = req.user._id
    const { fullname, email } = req.body

    const buyer = await changeBuyerProfileService({ buyerId, fullname, email })

    req.activityLog = {
        userId: buyer._id,
        role: "buyer",
        action: "UPDATE_PROFILE",
        message: "Profile updation request from buyer.",
        metadata: {
            id: buyer._id,
            fullname: buyer.fullname,
            phone: buyer.phone
        }
    }

    return res.status(201).json(new ApiResponse(201, buyer, "Profile updated Successfully"))
})

export const logoutBuyer = asyncHandler(async (req, res) => {

    req.activityLog = {
        userId: req.user._id,
        role: "buyer",
        action: "LOGOUT",
        message: "Account logged out by buyer.",
        metadata: {
            id: req.user._id,
        }
    }

    return res
        .clearCookie("token",
            {
                httpOnly: true,
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                secure: process.env.NODE_ENV === "production"
            }
        )
        .status(200)
        .json(new ApiResponse(200, null, "Logout Successfull"))
})

export const getPreHarvestedListings = asyncHandler(async (req, res) => {

    const { listings, pagination } = await getPreHarvestListingService(req.query)

    return res.status(200).json(new ApiResponse(200, { listings, pagination }, "Listing Feteched Successfully"))
})

export const getProductListings = asyncHandler(async (req, res) => {

    const { listings, pagination } = await getProductListingService(req.query)

    return res.status(200).json(new ApiResponse(200, { listings, pagination }, "Listing Feteched Successfully"))
})

export const getSingleProductListings = asyncHandler(async (req, res) => {

    const { listingId } = req.params
    const buyerId = req.user._id

    const product = await getSingleProductService({ listingId, buyerId })

    return res.status(200).json(new ApiResponse(200, product, "Listing Feteched Successfully"))
})

export const getSinglePreHarvestProductListing = asyncHandler(async (req, res) => {

    const { listingId } = req.params
    const buyerId = req.user._id

    const product = await getSinglePreHarvestProductForBuyer(listingId, buyerId)

    return res.status(200).json(new ApiResponse(200, product, "Listing Feteched Successfully"))
})

export const buyerDashbord = asyncHandler(async (req, res) => {
    const buyerId = req.user._id

    const dashboard = await buyerDashboardSevice(buyerId)

    return res
        .status(200)
        .json(new ApiResponse(200, dashboard, "Buyer dashboard fetched"));
})