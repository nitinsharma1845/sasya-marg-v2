import { adminDashboardService, adminProfileService, blockBuyerService, blockFarmerService, bootStrapSuperAdminService, changeEmailService, changeNameService, changePasswordService, changePhoneNumber, createAdminInviteService, getAdminByIdService, getAdminInviteService, getAllAdminsService, getAllBuyerService, getAllFarmerService, getAllPreHarvestedListingService, getAllProductListingService, getAllQueryService, getBuyerByIdService, getFarmerByIdService, globalSearchServiceForAdmin, globalSearchServiceForSuperAdmin, loginAdminService, loginSuperAdminService, ModeratePreHarvestedListingService, ModerateProductListingService, registerAdminWithInviteTokenService, revokeInviteService, superAdminDashboardService, unblockBuyerService, unblockFarmerService, updateQueryService } from '../services/admin.service.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/apiResponse.js'
import { getProductByIdService } from '../services/product.service.js'
import { getSinglePreharvestListingService } from '../services/preHarvestListing.service.js'
import { viewSingleQueryService } from '../services/query.service.js'
import { getBuyerReports, getReportById, replyReport } from '../services/productReport.service.js'


//Admin Invite Token Controller
export const createAdminInvite = asyncHandler(async (req, res) => {
    const adminId = req.user._id

    const invite = await createAdminInviteService({ adminId })

    return res.status(201).json(new ApiResponse(201, invite, "Admin invite token generated"))
})

export const getInvites = asyncHandler(async (req, res) => {
    const adminId = req.user._id
    const query = req.query

    const invites = await getAdminInviteService({ adminId, query })

    if (invites.length === 0) return res.status(200).json(new ApiResponse(200, [], "No invites found"))

    return res.status(200).json(new ApiResponse(200, invites, "Invites fetched successfully"))
})

export const revokeInvite = asyncHandler(async (req, res) => {
    const adminId = req.user._id
    const { inviteId } = req.params

    await revokeInviteService({ adminId, inviteId })

    return res.status(200).json(new ApiResponse(200, true, "Invite Revoked!"))
})

//

export const bootstrapSuperAdmin = asyncHandler(async (req, res) => {
    const superAdmin = await bootStrapSuperAdminService(req.body)

    return res.status(201).json(new ApiResponse(201, superAdmin, "Super Admin created successfully"))
})


export const bootStrapSuperAdminLogin = asyncHandler(async (req, res) => {
    const { identifier, password } = req.body
    const { superAdmin, token } = await loginSuperAdminService({ identifier, password })

    return res
        .cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 100 * 60 * 60 * 24 * 7 })
        .status(200)
        .json(new ApiResponse(200, superAdmin, "Super Admin loggedin successfully"))
})

export const bootstrapSuperAdminLogout = asyncHandler(async (req, res) => {
    return res
        .clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === 'production'
        })
        .status(200)
        .json(new ApiResponse(200, null, "Super Admin logged out"))
})

export const superAdminDashboard = asyncHandler(async (req, res) => {
    const data = await superAdminDashboardService()

    return res.status(200).json(new ApiResponse(200, data, "Dashboard fetched successfully"))
})

export const getAllAdmins = asyncHandler(async (req, res) => {
    const data = await getAllAdminsService({ query: req.query })

    return res.status(200).json(new ApiResponse(200, data, "Admin fetched successfully"))
})

export const globalSerachForSuperAdmin = asyncHandler(async (req, res) => {
    const { results, pagination } = await globalSearchServiceForSuperAdmin({ query: req.query })
    return res.status(200).json(new ApiResponse(200, { results, pagination }, "result fetched successfully"))
})

//register admin with invite token

export const registerAdminWithInviteToken = asyncHandler(async (req, res) => {
    const { inviteToken } = req.query

    const admin = await registerAdminWithInviteTokenService({ inviteToken, payload: req.body })

    req.activityLog = {
        userId: admin._id,
        role: "admin",
        action: "ACCOUNT_CREATED",
        message: "Account creation done for admin role threw inviteToke.",
        metadata: {
            id: admin._id,
            fullname: admin.fullname,
            phone: admin.phone,
            email: admin.email,
        }
    }

    return res.status(200).json(new ApiResponse(200, admin, "Admin created successfully"))

})

export const loginAdmin = asyncHandler(async (req, res) => {
    const { identifier, password } = req.body

    const { token, admin } = await loginAdminService({ identifier, password })

    req.activityLog = {
        userId: admin._id,
        role: "admin",
        action: "LOGIN",
        message: "Login done for admin account.",
        metadata: {
            id: admin._id,
            fullname: admin.fullname,
            phone: admin.phone,
            email: admin.email,
        }
    }

    return res
        .cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV,
            sameSite: "strict"
        })
        .status(200)
        .json(new ApiResponse(200, admin, "Admin logged In successfully"))
})

export const logoutAdmin = asyncHandler(async (req, res) => {

    req.activityLog = {
        userId: req.user._id,
        role: "admin",
        action: "LOGOUT",
        message: "Account Log outed by admin role.",
        metadata: {
            id: req.user._id
        }
    }
    return res
        .clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV
        })
        .status(200)
        .json(new ApiResponse(200, null, "Logout Successfull"))
})

export const globalSearchForAdmin = asyncHandler(async (req, res) => {
    const { results, pagination } = await globalSearchServiceForAdmin({ query: req.query })
    return res.status(200).json(new ApiResponse(200, { results, pagination }, "result fetched successfully"))
})

//ADMIN MODERATION CONTROLLERS

export const getAllPreHarvestedListing = asyncHandler(async (req, res) => {
    const { listings, pagination } = await getAllPreHarvestedListingService(req.query)

    return res.status(200).json(new ApiResponse(200, { listings, pagination }, "Listing fetch successfully"))
})

export const getSinglePreHarvestedListing = asyncHandler(async (req, res) => {
    const { productId } = req.params
    const listing = await getSinglePreharvestListingService(null, "admin", productId)

    return res.status(200).json(new ApiResponse(200, listing, "Listing fetched successfully"))
})

export const getAllProductListing = asyncHandler(async (req, res) => {
    const { listings, pagination } = await getAllProductListingService(req.query)

    return res.status(200).json(new ApiResponse(200, { listings, pagination }, "Listing fetch successfully"))
})

export const getSingleProductListing = asyncHandler(async (req, res) => {
    const { productId } = req.params

    const listing = await getProductByIdService({ listingId: productId })
    return res.status(200).json(new ApiResponse(200, listing, "Listing fetched successfully"))
})

export const moderatePreHarvestListing = asyncHandler(async (req, res) => {
    const { listingId } = req.params
    const adminId = req.user._id

    const { action, reason } = req.body

    const listing = await ModeratePreHarvestedListingService({ listingId, adminId, action, reason })

    req.activityLog = {
        userId: adminId,
        role: "admin",
        action: "MODERATION",
        message: "Pre-harvest crop listing is moderated by admin.",
        metadata: {
            adminId,
            listingId: listing._id,
            moderatedTo: action,
            productType: "pre-harvest"
        }
    }

    return res.status(200).json(new ApiResponse(200, listing, "moderation changed successfully"))
})

export const moderateProductListing = asyncHandler(async (req, res) => {
    const { listingId } = req.params
    const adminId = req.user._id

    const { action, reason } = req.body

    const listing = await ModerateProductListingService({ listingId, adminId, action, reason })

    req.activityLog = {
        userId: adminId,
        role: "admin",
        action: "MODERATION",
        message: "Harvested crop listing is moderated by admin.",
        metadata: {
            adminId,
            listingId: listing._id,
            moderatedTo: action,
            productType: "harvested"
        }
    }

    return res.status(200).json(new ApiResponse(200, listing, "moderation changed successfully"))
})

export const getAllQuery = asyncHandler(async (req, res) => {
    const { queries, pagination } = await getAllQueryService(req.query)

    return res.status(200).json(new ApiResponse(200, { queries, pagination }, "Query fetched"))
})

export const getAllReports = asyncHandler(async (req, res) => {
    const { reports, pagination } = await getBuyerReports({ query: req.query })
    return res.status(200).json(new ApiResponse(200, { reports, pagination }, "Reports fetched successfully"))
})

export const getSingleQuery = asyncHandler(async (req, res) => {
    const user = req.user
    const { queryId } = req.params
    const query = await viewSingleQueryService(user, queryId)
    return res.status(200).json(new ApiResponse(200, query, "Query fetched successfully"))
})

export const getSingleReport = asyncHandler(async (req, res) => {
    const { reportId } = req.params
    const report = await getReportById(reportId)

    return res.status(200).json(new ApiResponse(200, report, "Report fetched successfully"))
})

export const replyToQuery = asyncHandler(async (req, res) => {
    const query = await updateQueryService({
        reply: req.body.reply,
        adminId: req.user._id,
        queryId: req.params.queryId
    })

    req.activityLog = {
        userId: adminId,
        role: "admin",
        action: "RESPONSE",
        message: "Query response done.",
        metadata: {
            adminId,
            queryId,
            reply
        }
    }

    return res.status(200).json(new ApiResponse(200, query, "Reply sent"))
})

export const replyToReport = asyncHandler(async (req, res) => {
    const { reportId } = req.params
    const { reply } = req.body
    const { adminId } = req.user._id
    const report = await replyReport({ reportId, reply, adminId })

    req.activityLog = {
        userId: adminId,
        role: "admin",
        action: "RESPONSE",
        message: "Buyer Report response done.",
        metadata: {
            adminId,
            reportId,
            reply
        }
    }

    return res.status(200).json(new ApiResponse(200, report, "Reply sent"))
})

export const changeQueryStatus = asyncHandler(async (req, res) => {
    const query = await updateQueryService({
        status: req.body.status,
        adminId: req.user._id,
        queryId: req.params.queryId
    })

    req.activityLog = {
        userId: adminId,
        role: "admin",
        action: "MODERATION",
        message: "Farmer Query status changed.",
        metadata: {
            adminId,
            queryId,
            status
        }
    }

    return res.status(200).json(new ApiResponse(200, query, "Query status updated"))
})

export const changeQueryPriority = asyncHandler(async (req, res) => {
    const query = await updateQueryService({
        priority: req.body.priority,
        adminId: req.user._id,
        queryId: req.params.queryId
    })

    req.activityLog = {
        userId: adminId,
        role: "admin",
        action: "MODERATION",
        message: "Farmer Query priority changed.",
        metadata: {
            adminId,
            queryId,
            priority
        }
    }

    return res.status(200).json(new ApiResponse(200, query, "Query status updated"))
})

export const getAllFarmer = asyncHandler(async (req, res) => {
    const { farmers, pagination } = await getAllFarmerService(req.query)

    return res.status(200).json(new ApiResponse(200, { farmers, pagination }, "All Farmer fetched"))
})

export const blockFarmer = asyncHandler(async (req, res) => {
    const farmer = await blockFarmerService({ adminId: req.user._id, farmerId: req.params.farmerId, reason: req.body.reason })

    req.activityLog = {
        userId: req.user._id,
        role: "admin",
        action: "MODERATION",
        message: "Farmer Blocked",
        metadata: {
            adminId: req.user._id,
            farmerId: farmer._id,
            reason: req.body.reason
        }
    }

    return res.status(200).json(new ApiResponse(200, farmer, "farmer blocked"))
})

export const unBlockFarmer = asyncHandler(async (req, res) => {
    const farmer = await unblockFarmerService({ farmerId: req.params.farmerId, })

    req.activityLog = {
        userId: req.user._id,
        role: "admin",
        action: "MODERATION",
        message: "Farmer Unblocked",
        metadata: {
            adminId: req.user._id,
            farmerId: farmer._id,
        }
    }

    return res.status(200).json(new ApiResponse(200, farmer, "farmer unBlocked"))
})

export const getAllBuyer = asyncHandler(async (req, res) => {
    const { buyers, pagination } = await getAllBuyerService(req.query)

    return res.status(200).json(new ApiResponse(200, { buyers, pagination }, "All Buyers fetched"))
})

export const blockBuyer = asyncHandler(async (req, res) => {
    const buyer = await blockBuyerService({ adminId: req.user._id, buyerId: req.params.buyerId, reason: req.body.reason })

    req.activityLog = {
        userId: req.user._id,
        role: "admin",
        action: "MODERATION",
        message: "Buyer Blocked",
        metadata: {
            adminId: req.user._id,
            buyerId: buyer._id,
            reason: req.body.reason
        }
    }

    return res.status(200).json(new ApiResponse(200, buyer, "Buyer blocked"))
})

export const unBlockBuyer = asyncHandler(async (req, res) => {
    const buyer = await unblockBuyerService({ buyerId: req.params.buyerId, })

    req.activityLog = {
        userId: req.user._id,
        role: "admin",
        action: "MODERATION",
        message: "Buyer Unblocked",
        metadata: {
            adminId: req.user._id,
            buyerId: buyer._id,
        }
    }

    return res.status(200).json(new ApiResponse(200, buyer, "Buyer unBlocked"))
})

export const getAdminById = asyncHandler(async (req, res) => {
    const { adminId } = req.params

    const admin = await getAdminByIdService({ adminId })

    return res.status(200).json(new ApiResponse(200, admin, "Admin fetched successfully"))
})

export const getFarmerById = asyncHandler(async (req, res) => {
    const { farmerId } = req.params

    const farmer = await getFarmerByIdService({ farmerId })

    return res.status(200).json(new ApiResponse(200, farmer, "Farmer fetched successfully"))
})

export const getBuyerById = asyncHandler(async (req, res) => {
    const { buyerId } = req.params

    const buyer = await getBuyerByIdService({ buyerId })

    return res.status(200).json(new ApiResponse(200, buyer, "Admin fetched successfully"))
})


export const getAdminDashboard = asyncHandler(async (req, res) => {

    const dashboard = await adminDashboardService()

    return res
        .status(200)
        .json(new ApiResponse(200, dashboard, "Admin dashboard fetched successfully"))
})

//profile controllers

export const getAdminProfile = asyncHandler(async (req, res) => {
    const admin = await adminProfileService(req.user._id)
    return res.status(200).json(new ApiResponse(200, admin, "profile fetched"))
})

export const changePassword = asyncHandler(async (req, res) => {
    const adminId = req.user._id
    const { newPassword, oldPassword } = req.body

    const admin = await changePasswordService({ adminId, newPassword, oldPassword })

    req.activityLog = {
        userId: req.user._id,
        role: "admin",
        action: "PROFILE_UPDATE",
        message: "Password changed.",
        metadata: {
            adminId: req.user._id,
            fullname: admin.fullname,
            phone: admin.phone
        }
    }

    return res.status(200).json(new ApiResponse(200, admin, "Password changed successfully"))
})

export const changeFullname = asyncHandler(async (req, res) => {
    const adminId = req.user._id
    const { newFullname } = req.body

    const admin = await changeNameService({ adminId, newFullname })

    req.activityLog = {
        userId: req.user._id,
        role: "admin",
        action: "PROFILE_UPDATE",
        message: "Fullname changed.",
        metadata: {
            adminId: req.user._id,
            fullname: admin.fullname,
            phone: admin.phone,
            email: admin.email
        }
    }

    return res.status(200).json(new ApiResponse(200, admin, "Name changed successfully"))
})

export const changePhone = asyncHandler(async (req, res) => {
    const adminId = req.user._id
    const { newPhone, otp, purpose } = req.body

    const admin = await changePhoneNumber({ adminId, newPhone, otp, purpose })

    req.activityLog = {
        userId: req.user._id,
        role: "admin",
        action: "PROFILE_UPDATE",
        message: "Phone changed.",
        metadata: {
            adminId: req.user._id,
            fullname: admin.fullname,
            phone: admin.phone,
            email: admin.email
        }
    }

    return res.status(200).json(new ApiResponse(200, admin, "Phone number changed successfully"))
})

export const changeEmail = asyncHandler(async (req, res) => {
    const adminId = req.user._id
    const { newEmail } = req.body

    const admin = await changeEmailService({ adminId, newEmail })

    req.activityLog = {
        userId: req.user._id,
        role: "admin",
        action: "PROFILE_UPDATE",
        message: "Email changed.",
        metadata: {
            adminId: req.user._id,
            fullname: admin.fullname,
            phone: admin.phone,
            email: admin.email
        }
    }

    return res.status(200).json(new ApiResponse(200, admin, "Phone number changed successfully"))
})