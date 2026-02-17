import { Admin } from "../models/admin.model.js"
import { ApiError } from "../utils/apiError.js"
import { Farmer } from '../models/farmer.model.js'
import { Buyer } from '../models/buyer.model.js'
import { generateToken } from "../utils/generateToken.js"
import crypto from 'crypto'
import { AdminInvite } from "../models/adminInvite.model.js"
import { PreHarvestListing } from "../models/preHarvetedListing.model.js"
import { Product } from "../models/product.model.js"
import { Query } from "../models/query.model.js"
import { ProductReport } from '../models/productReport.model.js'
import { GovernmentScheme } from '../models/governmentScheme.model.js'
import { PredictHistory } from '../models/predictHistory.model.js'
import { FarmLand } from '../models/farmLand.model.js'
import mongoose from "mongoose"

//InviteToken service

export const createAdminInviteService = async ({ adminId }) => {
    const token = crypto.randomBytes(32).toString('hex')

    const invite = await AdminInvite.create({
        token,
        invitedBy: adminId,
        role: 'admin',
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24)  //24 h
    })

    return {
        token: invite.token,
        expiresAt: invite.expiresAt,
        role: invite.role
    }
}

export const getAdminInviteService = async ({ adminId, query }) => {
    const { page = 1, limit = 9 } = query

    const skip = (Number(page) - 1) * Number(limit)

    const [invites, total] = await Promise.all([
        AdminInvite.find({ invitedBy: adminId }).sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit)),
        AdminInvite.countDocuments()
    ])

    return {
        invites,
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit)
        }
    }
}

export const revokeInviteService = async ({ adminId, inviteId }) => {
    const invite = await AdminInvite.findOneAndDelete({ _id: inviteId, invitedBy: adminId })
    return true
}

//Invite token service end here

//Super Admin Services


export const bootStrapSuperAdminService = async ({
    fullname,
    email,
    phone,
    password,
    secret
}) => {
    if (secret !== process.env.SUPER_ADMIN_SECRET) {
        throw new ApiError(403, "Invalid Bootstrap Secret")
    }

    const adminCount = await Admin.countDocuments()

    if (adminCount > 0) {
        throw new ApiError(409, "Super admin is already exist")
    }

    const [farmerExist, buyerExist] = await Promise.all([
        Farmer.exists({
            $or: [{ phone }, { email: email.toLowerCase() }]
        }),
        Buyer.exists({
            $or: [{ phone }, { email: email.toLowerCase() }]
        }),

    ])

    if (farmerExist || buyerExist) {
        throw new ApiError(409, "User already exsit with email or phone")
    }

    const superAdmin = await Admin.create({
        fullname,
        email,
        phone,
        password,
        role: "super_admin",
        isActive: true
    })


    return {
        fullname: superAdmin.fullname,
        email: superAdmin.email,
        phone: superAdmin.phone,
        role: superAdmin.role,
        _id: superAdmin._id,
        createdAt: superAdmin.createdAt

    }
}

export const loginSuperAdminService = async ({ identifier, password }) => {
    const filter = {}

    if (identifier.includes('@')) {
        filter.email = identifier
    } else {
        filter.phone = identifier
    }

    const superAdmin = await Admin.findOne(filter).select("+password")

    if (!superAdmin) {
        throw new ApiError(403, "Invalid Credentials")
    }

    if (superAdmin.role !== "super_admin") {
        throw new ApiError(403, "Access denied ")
    }

    const isPaswordValid = await superAdmin.comparePassword(password)


    if (!isPaswordValid) {
        throw new ApiError(403, "Invalid credentials")
    }

    if (superAdmin.isActive === false) {
        throw new ApiError(403, "Admin Account is disabled")
    }

    const token = generateToken({ _id: superAdmin._id, role: "super_admin" })

    return {
        admin: {
            _id: superAdmin._id,
            fullname: superAdmin.fullname,
            email: superAdmin.email,
            role: superAdmin.role
        }
        , token
    }

}

export const getAllAdminsService = async ({ query }) => {
    const { fullname, page = 1, limit = 10, isActive } = query
    const filter = { role: "admin" }

    if (fullname) {
        filter.fullname = { $regex: fullname, $options: "i" }
    }

    if (isActive) {
        filter.isActive = isActive
    }

    const skip = (Number(page) - 1) * Number(limit)

    const [admins, total] = await Promise.all([
        Admin.find(filter)
            .select("fullname email phone lastLogin createdAt")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit)),
        Admin.countDocuments(filter)
    ])

    return {
        admins,
        pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
        }
    }
}


export const globalSearchServiceForSuperAdmin = async ({ query }) => {
    const { search, page = 1, limit = 10 } = query

    if (!search?.trim()) {
        return {
            results: [],
            pagination: {
                total: 0,
                page: Number(page),
                limit: Number(limit),
                totalPages: 0
            }
        }
    }

    const pageNumber = Number(page)
    const limitNumber = Number(limit)
    const skip = (pageNumber - 1) * limitNumber

    const searchRegex = new RegExp(search.trim(), "i")

    const baseMatch = {
        $match: {
            $or: [
                { fullname: searchRegex },
                { email: searchRegex },
                { phone: searchRegex }
            ]
        }
    }

    const aggregationPipeline = [
        baseMatch,
        {
            $addFields: { type: "farmer" }
        },
        {
            $unionWith: {
                coll: "buyers",
                pipeline: [
                    baseMatch,
                    { $addFields: { type: "buyer" } }
                ]
            }
        },
        {
            $unionWith: {
                coll: "admins",
                pipeline: [
                    baseMatch,
                    { $addFields: { type: "admin" } }
                ]
            }
        },
        {
            $project: {
                _id: 1,
                fullname: 1,
                email: 1,
                phone: 1,
                createdAt: 1,
                type: 1
            }
        },
        { $sort: { createdAt: -1 } },
        {
            $facet: {
                data: [
                    { $skip: skip },
                    { $limit: limitNumber }
                ],
                totalCount: [
                    { $count: "count" }
                ]
            }
        }
    ]

    const result = await Farmer.aggregate(aggregationPipeline)

    const data = result[0]?.data || []
    const total = result[0]?.totalCount[0]?.count || 0

    const reshapedResults = data.map(item => ({
        type: item.type,
        id: item._id,
        title: item.fullname || "Unnamed",
        subtitle: item.email || item.phone || "No Contact",
        createdAt: item.createdAt
    }))

    return {
        results: reshapedResults,
        pagination: {
            total,
            page: pageNumber,
            limit: limitNumber,
            totalPages: Math.ceil(total / limitNumber)
        }
    }
}




//register admin service with token


export const registerAdminWithInviteTokenService = async ({ inviteToken, payload }) => {

    if (!inviteToken || typeof inviteToken !== "string") {
        throw new ApiError(400, "Invite token is required")
    }
    const invite = await AdminInvite.findOne({
        token: inviteToken,
        used: false,
        expiresAt: { $gt: new Date() }
    })

    if (!invite) {
        throw new ApiError(403, "Invalid or expired invite token")
    }


    const [superAdminExist, farmerExist, buyerExist] = await Promise.all([
        Admin.exists({
            $or: [{ phone: payload.phone }, { email: payload.email }]
        }),
        Farmer.exists({
            $or: [{ phone: payload.phone }, { email: payload.email }]
        }),
        Buyer.exists({
            $or: [{ phone: payload.phone }, { email: payload.email }]
        })
    ])

    if (superAdminExist || farmerExist || buyerExist) {
        throw new ApiError(403, "Number or email is already in use")
    }

    const admin = await Admin.create({
        ...payload,
        role: invite.role
    })

    invite.used = true
    admin.lastLogin = new Date()
    await admin.save()
    await invite.save()

    return admin
}


//core admin services
export const loginAdminService = async ({ identifier, password }) => {
    const filter = identifier.includes("@") ? { email: identifier } : { phone: identifier }

    const admin = await Admin.findOne(filter).select("+password")

    if (!admin) {
        throw new ApiError(404, "Admin not found")
    }

    const verifyPassword = await admin.comparePassword(password)

    if (!verifyPassword) throw new ApiError(403, "Invalid credentials")

    if (!admin.isActive) throw new ApiError(403, "Admin account is not active")

    const token = generateToken({ _id: admin._id, role: admin.role })

    admin.lastLogin = new Date()
    await admin.save()

    return { admin, token }

}

//ADMIN MODERATION SERVICES

export const getAllPreHarvestedListingService = async (query) => {
    const { page = 1, limit = 10, moderation } = query

    const filter = {}
    if (moderation) {
        filter.moderation = moderation
    }

    const skip = (Number(page) - 1) * limit

    const [listings, total] = await Promise.all([
        PreHarvestListing.find(filter).populate({
            path: "farmer",
            select: "fullname phone"
        })
            .populate({
                path: "farmland",
                select: "name size isActive",
                populate: {
                    path: "location",
                    select: "locality district state"
                }
            })
            .sort({ "createdAt": -1 })
            .skip(skip)
            .limit(Number(limit)),

        PreHarvestListing.countDocuments(filter)
    ])

    return {
        listings,
        pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
        }
    }
}

export const getAllProductListingService = async (query) => {
    const { page = 1, limit = 10, moderation } = query

    const filter = {}
    if (moderation) {
        filter.moderation = moderation
    }

    const skip = (Number(page) - 1) * limit

    const [listings, total] = await Promise.all([
        Product.find(filter).populate({
            path: "farmer",
            select: "fullname phone"
        })
            .populate({
                path: "farmland",
                select: "name size isActive",
                populate: {
                    path: "location",
                    select: "locality district state"
                }
            })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit)),

        Product.countDocuments(filter)
    ])

    return {
        listings,
        pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
        }
    }
}

export const ModeratePreHarvestedListingService = async ({
    listingId,
    adminId,
    action,
    reason = null
}) => {

    if (!["approved", "rejected"].includes(action)) {
        throw new ApiError(400, "Invalid moderation action")
    }

    const listing = await PreHarvestListing.findById(listingId)
    if (!listing) throw new ApiError(404, "Listing not found")

    if (listing.moderation !== "pending") {
        throw new ApiError(400, "Listing already moderated")
    }

    if (action === "rejected" && !reason) {
        throw new ApiError(400, "Rejection reason is required")
    }

    listing.moderation = action
    listing.reviewedBy = adminId
    listing.reviewedAt = new Date()
    listing.rejectionReason = action === "rejected" ? reason : null

    await listing.save()
    return listing
}

export const ModerateProductListingService = async ({
    listingId,
    adminId,
    action,
    reason = null
}) => {

    if (!["approved", "rejected"].includes(action)) {
        throw new ApiError(400, "Invalid moderation action")
    }

    const listing = await Product.findById(listingId)
    if (!listing) throw new ApiError(404, "Listing not found")

    if (listing.moderation !== "pending") {
        throw new ApiError(400, "Listing already moderated")
    }

    if (action === "rejected" && !reason) {
        throw new ApiError(400, "Rejection reason is required")
    }

    listing.moderation = action
    listing.reviewedBy = adminId
    listing.reviewedAt = new Date()
    listing.rejectionReason = action === "rejected" ? reason : null

    await listing.save()
    return listing
}

export const getAllQueryService = async (query) => {
    let {
        page = 1,
        limit = 10,
        inquiry,
        status,
        priority
    } = query

    page = Math.max(1, Number(page))
    limit = Math.min(50, Number(limit)) // hard cap

    const filter = {}

    const validInquiry = ["crop", "product", "weather", "pricing", "technical", "other"]
    const validStatus = ["open", "resolved", "closed"]
    const validPriority = ["low", "medium", "high"]

    if (inquiry && validInquiry.includes(inquiry)) {
        filter.inquiry = inquiry
    }

    if (status && validStatus.includes(status)) {
        filter.status = status
    } else {
        filter.status = "open" // default for admin
    }

    if (priority && validPriority.includes(priority)) {
        filter.priority = priority
    }

    const skip = (page - 1) * limit

    const [queries, total] = await Promise.all([
        Query.find(filter)
            .populate("farmer", "fullname phone email")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),

        Query.countDocuments(filter)
    ])

    return {
        queries,
        pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
        }
    }
}

export const updateQueryService = async ({
    queryId,
    adminId,
    reply,
    status,
    priority
}) => {
    const query = await Query.findById(queryId)
    if (!query) throw new ApiError(404, "Query not found")

    if (reply) {
        query.adminReply = reply
        query.repliedBy = adminId
        query.repliedAt = new Date()
        query.status = "resolved"
    }

    if (status) {
        query.status = status
    }

    if (priority) {
        query.priority = priority
    }

    await query.save()
    return query
}

export const getAllFarmerService = async (query) => {
    const { page = 1, limit = 10, isVarified, isActive, search } = query

    const filter = {}

    if (isVarified) {
        filter.isVarified = isVarified
    }

    if (isActive) {
        filter.isActive = isActive
    }

    if (search?.trim()) {
        const regex = new RegExp(search.trim(), "i")

        const conditions = [
            { fullname: regex },
            { email: regex },
            { phone: regex }
        ]

        if (mongoose.Types.ObjectId.isValid(search)) {
            conditions.push({ _id: search })
        }

        filter.$or = conditions
    }


    const skip = (Number(page) - 1) * Number(limit)

    const [farmers, total] = await Promise.all([
        Farmer.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),

        Farmer.countDocuments(filter)
    ])

    return {
        farmers,
        pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
        }
    }
}

export const blockFarmerService = async ({ adminId, farmerId, reason }) => {
    const farmer = await Farmer.findById(farmerId)

    if (!farmer) throw new ApiError(404, "farmer not found")

    farmer.isActive = false
    farmer.blockedBy = adminId
    farmer.blockedAt = new Date()
    farmer.blockReason = reason || "Policy violation"

    await farmer.save()
    return farmer
}

export const unblockFarmerService = async ({ farmerId }) => {
    const farmer = await Farmer.findById(farmerId)
    if (!farmer) throw new ApiError(404, "Farmer not found")

    farmer.isActive = true
    farmer.blockedBy = null
    farmer.blockedAt = null
    farmer.blockReason = null

    await farmer.save()
    return farmer
}

export const getAllBuyerService = async (query) => {
    const { page = 1, limit = 10, isBlocked } = query

    const filter = {}

    if (isBlocked) {
        filter.isBlocked = isBlocked
    }

    const skip = (Number(page) - 1) * Number(limit)

    const [buyers, total] = await Promise.all([
        Buyer.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),

        Buyer.countDocuments(filter)
    ])

    return {
        buyers,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    }
}

export const blockBuyerService = async ({ adminId, buyerId, reason }) => {
    const buyer = await Buyer.findById(buyerId)

    if (!buyer) throw new ApiError(404, "Buyer not found")

    buyer.isBlocked = true
    buyer.blockedBy = adminId
    buyer.blockedAt = new Date()
    buyer.blockReason = reason || "Policy violation"

    await buyer.save()
    return buyer
}

export const unblockBuyerService = async ({ buyerId }) => {
    const buyer = await Buyer.findById(buyerId)
    if (!buyer) throw new ApiError(404, "Buyer not found")

    buyer.isBlocked = false
    buyer.blockedBy = null
    buyer.blockedAt = null
    buyer.blockReason = null

    await buyer.save()
    return buyer
}

export const getBuyerByIdService = async ({ buyerId }) => {
    const buyer = await Buyer.findById(buyerId)
        .select("-password -__v")

    if (!buyer) {
        throw new ApiError(404, "Buyer not found")
    }

    return buyer
}

export const getFarmerByIdService = async ({ farmerId }) => {

    const [farmer, farmlands] = await Promise.all([
        Farmer.findById(farmerId).select("-password -__v"),
        FarmLand.find({ owner: farmerId }).populate({
            path: "location",
            select: "locality city state district"
        })
    ])

    if (!farmer) {
        throw new ApiError(404, "Farmer not found")
    }

    const result = farmer.toObject()
    result.farmlands = farmlands

    return result
}

export const getAdminByIdService = async ({ adminId }) => {
    const admin = await Admin.findById(adminId)
        .select("-password -__v")

    if (!admin) {
        throw new ApiError(404, "Admin not found")
    }

    return admin
}


//DASHBOARD API

export const superAdminDashboardService = async () => {

    const sevenDaysAgo = new Date(
        Date.now() - 7 * 24 * 60 * 60 * 1000
    )

    const farmerPipeline = [
        {
            $group: {
                _id: null,
                totalFarmers: { $sum: 1 },
                activeFarmers: {
                    $sum: {
                        $cond: [
                            { $eq: ["$isActive", true] },
                            1,
                            0
                        ]
                    }

                },
                suspendedFarmers: {
                    $sum: {
                        $cond: [
                            { $eq: ["$isActive", false] },
                            1,
                            0
                        ]
                    }

                },
                newFarmers: {
                    $sum: {
                        $cond: [
                            {
                                $gte: [
                                    "$createdAt",
                                    sevenDaysAgo
                                ]
                            },
                            1,
                            0
                        ]
                    }
                }
            }
        }
    ]

    const buyerPipeline = [
        {
            $group: {
                _id: null,
                totalBuyers: { $sum: 1 },
                activeBuyers: {
                    $sum: {
                        $cond: [{ $eq: ["$isBlocked", false] }, 1, 0]
                    }
                },
                suspendedBuyers: {
                    $sum: {
                        $cond: [
                            { $eq: ["$isBlocked", true] },
                            1,
                            0
                        ]
                    }
                },
                newBuyers: {
                    $sum: {
                        $cond: [
                            { $gte: ["$createdAt", sevenDaysAgo] },
                            1,
                            0
                        ]
                    }
                }
            }
        }
    ]

    const adminPipeline = [
        {
            $match: {
                role: "admin"
            }
        },
        {
            $group: {
                _id: null,
                totalAdmins: {
                    $sum: 1
                },
                recentAdmins: {
                    $sum: {
                        $cond: [
                            { $gte: ["$createdAt", sevenDaysAgo] },
                            1,
                            0
                        ]
                    }
                }
            }
        }
    ]

    const productPipeline = [
        {
            $group: {
                _id: null,
                totalListings: { $sum: 1 },
                pendingListings: {
                    $sum: {
                        $cond: [
                            { $eq: ['$moderation', "pending"] },
                            1,
                            0
                        ]
                    }
                },
                approvedListings: {
                    $sum: {
                        $cond: [
                            { $eq: ['$moderation', "approved"] },
                            1,
                            0
                        ]
                    }
                },
                rejectedListings: {
                    $sum: {
                        $cond: [
                            { $eq: ['$moderation', "rejected"] },
                            1,
                            0
                        ]
                    }
                },
                newListings: {
                    $sum: {
                        $cond: [
                            { $gte: ["$createdAt", sevenDaysAgo] },
                            1,
                            0
                        ]
                    }
                }
            }
        }
    ]

    const reportPipeline = [
        {
            $group: {
                _id: null,
                totalReports: { $sum: 1 },
                pendingReports: {
                    $sum: {
                        $cond: [
                            { $eq: ['$status', 'pending'] },
                            1,
                            0
                        ]
                    }
                },
                rejectedReports: {
                    $sum: {
                        $cond: [
                            { $eq: ['$status', 'rejected'] },
                            1,
                            0
                        ]
                    }
                },
                resolvedReports: {
                    $sum: {
                        $cond: [
                            { $eq: ['$status', 'action_taken'] },
                            1,
                            0
                        ]
                    }
                },
                newReports: {
                    $sum: {
                        $cond: [
                            { $gte: ["$createdAt", sevenDaysAgo] },
                            1,
                            0
                        ]
                    }
                }
            }
        }
    ]

    const schemesPipeline = [
        {
            $group: {
                _id: null,
                totalSchemes: { $sum: 1 },
                activeSchemes: {
                    $sum: {
                        $cond: ["$isActive", 1, 0]
                    }
                }
            }
        }
    ]

    const predictionPipeline = [
        {
            $group: {
                _id: null,
                totalPredictions: { $sum: 1 },
                newPredictions: {
                    $sum: {
                        $cond: [
                            { $gte: ['$createdAt', sevenDaysAgo] },
                            1,
                            0
                        ]
                    }
                }
            }
        }
    ]

    const queryPipeline = [
        {
            $group: {
                _id: null,
                totalQueries: {
                    $sum: 1
                },
                openQueries: {
                    $sum: {
                        $cond: [
                            { $eq: ["$status", "open"] },
                            1,
                            0
                        ]
                    }
                },
                resolvedQueries: {
                    $sum: {
                        $cond: [
                            { $eq: ["$status", "resolved"] },
                            1,
                            0
                        ]
                    }
                },
                newQueries: {
                    $sum: {
                        $cond: [
                            { $gte: ['$createdAt', sevenDaysAgo] },
                            1,
                            0
                        ]
                    }
                }
            }
        }
    ]


    const [farmers, buyers, admins, preharvestedListings, harvestedListing, reports, schemes, predictions, queries] = await Promise.all([
        Farmer.aggregate(farmerPipeline),
        Buyer.aggregate(buyerPipeline),
        Admin.aggregate(adminPipeline),
        PreHarvestListing.aggregate(productPipeline),
        Product.aggregate(productPipeline),
        ProductReport.aggregate(reportPipeline),
        GovernmentScheme.aggregate(schemesPipeline),
        PredictHistory.aggregate(predictionPipeline),
        Query.aggregate(queryPipeline)
    ])

    const safe = (data, fallback) => data[0] || fallback

    const farmerStats = safe(farmers, {
        totalFarmers: 0,
        activeFarmers: 0,
        suspendedFarmers: 0,
        newFarmers: 0
    })

    const buyerStats = safe(buyers, {
        totalBuyers: 0,
        activeBuyers: 0,
        suspendedBuyers: 0,
        newBuyers: 0
    })

    const adminStats = safe(admins, {
        totalAdmins: 0,
        recentAdmins: 0
    })

    const preHarvestStats = safe(preharvestedListings, {
        totalListings: 0,
        pendingListings: 0,
        approvedListings: 0,
        rejectedListings: 0,
        newListings: 0
    })

    const harvestStats = safe(harvestedListing, {
        totalListings: 0,
        pendingListings: 0,
        approvedListings: 0,
        rejectedListings: 0,
        newListings: 0
    })

    const reportStats = safe(reports, {
        totalReports: 0,
        pendingReports: 0,
        rejectedReports: 0,
        resolvedReports: 0,
        newReports: 0
    })

    const schemeStats = safe(schemes, {
        totalSchemes: 0,
        activeSchemes: 0
    })

    const predictionStats = safe(predictions, {
        totalPredictions: 0,
        newPredictions: 0
    })

    const queryStats = safe(queries, {
        totalQueries: 0,
        openQueries: 0,
        resolvedQueries: 0,
        newQueries: 0
    })


    const combinedListings = {
        totalListings:
            preHarvestStats.totalListings + harvestStats.totalListings,

        pendingListings:
            preHarvestStats.pendingListings + harvestStats.pendingListings,

        approvedListings:
            preHarvestStats.approvedListings + harvestStats.approvedListings,

        rejectedListings:
            preHarvestStats.rejectedListings + harvestStats.rejectedListings,

        newListings:
            preHarvestStats.newListings + harvestStats.newListings
    }


    return {
        users: {
            farmers: farmerStats,
            buyers: buyerStats,
            admins: adminStats
        },

        marketplace: {
            listings: combinedListings,
            reports: reportStats
        },

        governance: {
            schemes: schemeStats,
            queries: queryStats
        },

        intelligence: {
            predictions: predictionStats
        }
    }

}

export const adminDashboardService = async () => {

    const [
        totalFarmers,
        activeFarmers,
        blockedFarmers,

        totalBuyers,
        activeBuyers,
        blockedBuyers,

        totalProducts,
        pendingProducts,
        approvedProducts,
        rejectedProducts,

        totalListings,
        pendingListings,
        approvedListings,
        rejectedListings,

        totalQueries,
        openQueries,
        resolvedQueries,

        recentListings,
        recentQueries,
        recentReports,

        totalReports,
        pendingReports,
        resolvedReports
    ] = await Promise.all([


        Farmer.countDocuments(),
        Farmer.countDocuments({ isActive: false }),
        Farmer.countDocuments({ isActive: true }),


        Buyer.countDocuments(),
        Buyer.countDocuments({ isBlocked: false }),
        Buyer.countDocuments({ isBlocked: true }),


        Product.countDocuments(),
        Product.countDocuments({ moderation: "pending" }),
        Product.countDocuments({ moderation: "approved" }),
        Product.countDocuments({ moderation: "rejected" }),


        PreHarvestListing.countDocuments(),
        PreHarvestListing.countDocuments({ moderation: "pending" }),
        PreHarvestListing.countDocuments({ moderation: "approved" }),
        PreHarvestListing.countDocuments({ moderation: "rejected" }),


        Query.countDocuments(),
        Query.countDocuments({ status: "open" }),
        Query.countDocuments({ status: "resolved" }),


        PreHarvestListing.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select("title moderation createdAt"),

        Query.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select("subject status createdAt"),

        ProductReport.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select("reason description status createdAt"),

        ProductReport.countDocuments(),
        ProductReport.countDocuments({ status: "pending" }),
        ProductReport.countDocuments({ status: { $in: ["reviewed", "action_taken"] } })
    ])

    return {
        stats: {
            users: {
                farmers: {
                    total: totalFarmers,
                    active: activeFarmers,
                    blocked: blockedFarmers
                },
                buyers: {
                    total: totalBuyers,
                    active: activeBuyers,
                    blocked: blockedBuyers
                }
            },

            listings: {
                preHarvest: {
                    total: totalListings,
                    pending: pendingListings,
                    approved: approvedListings,
                    rejected: rejectedListings
                },
                products: {
                    total: totalProducts,
                    pending: pendingProducts,
                    approved: approvedProducts,
                    rejected: rejectedProducts
                }
            },

            queries: {
                farmerQueries: {
                    total: totalQueries,
                    open: openQueries,
                    resolved: resolvedQueries
                },
                buyerQueries: {
                    total: totalReports,
                    open: pendingReports,
                    resolved: resolvedReports
                }
            }
        },

        recent: {
            listings: recentListings,
            queries: {
                farmerQueries: recentQueries,
                buyersReports: recentReports
            }
        }
    }
}