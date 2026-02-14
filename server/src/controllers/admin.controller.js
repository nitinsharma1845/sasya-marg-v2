import { adminDashboardService, blockBuyerService, blockFarmerService, bootStrapSuperAdminService, createAdminInviteService, getAdminInviteService, getAllAdminsService, getAllBuyerService, getAllFarmerService, getAllPreHarvestedListingService, getAllProductListingService, getAllQueryService, globalSearchServiceForSuperAdmin, loginAdminService, loginSuperAdminService, ModeratePreHarvestedListingService, ModerateProductListingService, registerAdminWithInviteTokenService, revokeInviteService, superAdminDashboardService, unblockBuyerService, updateQueryService } from '../services/admin.service.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/apiResponse.js'


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

    return res.status(200).json(new ApiResponse(200, admin, "Admin created successfully"))

})

export const loginAdmin = asyncHandler(async (req, res) => {
    const { identifier, password } = req.body

    const { token, admin } = await loginAdminService({ identifier, password })

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
    return res
        .clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV
        })
        .status(200)
        .json(new ApiResponse(200, null, "Logout Successfull"))
})

//ADMIN MODERATION CONTROLLERS

export const getAllPreHarvestedListing = asyncHandler(async (req, res) => {
    const { listings, pagination } = await getAllPreHarvestedListingService(req.query)

    return res.status(200).json(new ApiResponse(200, { listings, pagination }, "Listing fetch successfully"))
})

export const getAllProductListing = asyncHandler(async (req, res) => {
    const { listings, pagination } = await getAllProductListingService(req.query)

    return res.status(200).json(new ApiResponse(200, { listings, pagination }, "Listing fetch successfully"))
})

export const moderatePreHarvestListing = asyncHandler(async (req, res) => {
    const { listingId } = req.params
    const adminId = req.user._id

    const { action, reason } = req.body

    const listing = await ModeratePreHarvestedListingService({ listingId, adminId, action, reason })

    return res.status(200).json(new ApiResponse(200, listing, "moderation changed successfully"))
})

export const moderateProductListing = asyncHandler(async (req, res) => {
    const { listingId } = req.params
    const adminId = req.user._id

    const { action, reason } = req.body

    const listing = await ModerateProductListingService({ listingId, adminId, action, reason })

    return res.status(200).json(new ApiResponse(200, listing, "moderation changed successfully"))
})

export const getAllQuery = asyncHandler(async (req, res) => {
    const { queries, pagination } = await getAllQueryService(req.query)

    return res.status(200).json(new ApiResponse(200, { queries, pagination }, "Query fetched"))
})

export const replyToQuery = asyncHandler(async (req, res) => {
    const query = await updateQueryService({
        reply: req.body.reply,
        adminId: req.user._id,
        queryId: req.params.queryId
    })

    return res.status(200).json(new ApiResponse(200, query, "Reply sent"))
})

export const changeQueryStatus = asyncHandler(async (req, res) => {
    const query = await updateQueryService({
        status: req.body.status,
        adminId: req.user._id,
        queryId: req.params.queryId
    })

    return res.status(200).json(new ApiResponse(200, query, "Query status updated"))
})

export const changeQueryPriority = asyncHandler(async (req, res) => {
    const query = await updateQueryService({
        priority: req.body.priority,
        adminId: req.user._id,
        queryId: req.params.queryId
    })

    return res.status(200).json(new ApiResponse(200, query, "Query status updated"))
})

export const getAllFarmer = asyncHandler(async (req, res) => {
    const { farmers, pagination } = await getAllFarmerService(req.query)

    return res.status(200).json(new ApiResponse(200, { farmers, pagination }, "All Farmer fetched"))
})

export const blockFarmer = asyncHandler(async (req, res) => {
    const farmer = await blockFarmerService({ adminId: req.user._id, farmerId: req.params.farmerId, reason: req.body.reason })

    return res.status(200).json(new ApiResponse(200, farmer, "farmer blocked"))
})

export const unBlockFarmer = asyncHandler(async (req, res) => {
    const farmer = await blockFarmerService({ farmerId: req.params.farmerId, })

    return res.status(200).json(new ApiResponse(200, farmer, "farmer unBlocked"))
})

export const getAllBuyer = asyncHandler(async (req, res) => {
    const { buyers, pagination } = await getAllBuyerService(req.query)

    return res.status(200).json(new ApiResponse(200, { buyers, pagination }, "All Buyers fetched"))
})

export const blockBuyer = asyncHandler(async (req, res) => {
    const buyer = await blockBuyerService({ adminId: req.user._id, buyerId: req.params.buyerId, reason: req.body.reason })

    return res.status(200).json(new ApiResponse(200, buyer, "Buyer blocked"))
})

export const unBlockBuyer = asyncHandler(async (req, res) => {
    const buyer = await unblockBuyerService({ buyerId: req.params.buyerId, })

    return res.status(200).json(new ApiResponse(200, buyer, "Buyer unBlocked"))
})


export const getAdminDashboard = asyncHandler(async (req, res) => {

    const dashboard = await adminDashboardService()

    return res
        .status(200)
        .json(new ApiResponse(200, dashboard, "Admin dashboard fetched successfully"))
})