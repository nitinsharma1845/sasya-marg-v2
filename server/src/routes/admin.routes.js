import { Router } from "express"
import { validate } from "../middleware/validate.middleware.js"
import { adminLoginSchema, blockBuyerSchema, blockFarmerSchema, bootstrapSuperAdminSchema, getAdminByIdSchema, getAllAdminSchema, getAllBuyerSchema, getAllFarmerSchema, getAllListingSchema, getAllQuerySchema, getAllReportsSchema, getBuyerByIdSchema, getFarmerByIdSchema, getSingleListing, getSingleReportSchema, globalSearchSchema, moderateListingSchema, registerAdminSchema, replyQuerySchema, replyReportSchema, revokeInviteSchema, unBlockBuyerSchema, unBlockFarmerSchema, updateQuerySchema } from "../validator/admin.validator.js"
import { blockBuyer, blockFarmer, bootstrapSuperAdmin, bootStrapSuperAdminLogin, bootstrapSuperAdminLogout, changeQueryPriority, changeQueryStatus, createAdminInvite, getAdminById, getAdminDashboard, getAllAdmins, getAllBuyer, getAllFarmer, getAllPreHarvestedListing, getAllProductListing, getAllQuery, getAllReports, getBuyerById, getFarmerById, getInvites, getSinglePreHarvestedListing, getSingleProductListing, getSingleQuery, getSingleReport, globalSearchForAdmin, globalSerachForSuperAdmin, loginAdmin, logoutAdmin, moderatePreHarvestListing, moderateProductListing, registerAdminWithInviteToken, replyToQuery, replyToReport, revokeInvite, superAdminDashboard, unBlockBuyer, unBlockFarmer } from "../controllers/admin.controller.js"
import { requireAdmin, requireSuperAdmin } from "../middleware/adminRole.middleware.js"
import { authLayer } from "../middleware/auth.middleware.js"
import { viewSingleQuerySchema } from "../validator/query.validator.js"

export const adminRoutes = Router()


//invite admin route

adminRoutes.get('/super-admin/invite', authLayer, requireSuperAdmin, createAdminInvite)

//super Admin routes 

adminRoutes.post('/super-admin/register', validate(bootstrapSuperAdminSchema), bootstrapSuperAdmin)

adminRoutes.post('/super-admin/login', validate(adminLoginSchema), bootStrapSuperAdminLogin)

adminRoutes.post('/super-admin/logout', authLayer, requireSuperAdmin, bootstrapSuperAdminLogout)

adminRoutes.get("/super-admin/dashboard", authLayer, requireSuperAdmin, superAdminDashboard)

adminRoutes.get("/super-admin/admins", validate(getAllAdminSchema), authLayer, requireSuperAdmin, getAllAdmins)

adminRoutes.get("/super-admin/admin/:adminId", validate(getAdminByIdSchema), authLayer, requireSuperAdmin, getAdminById)

adminRoutes.get("/super-admin/search", validate(globalSearchSchema), authLayer, requireSuperAdmin, globalSerachForSuperAdmin)

//register Admin via inviteToken

adminRoutes.post("/register", validate(registerAdminSchema), registerAdminWithInviteToken)

adminRoutes.post("/login", validate(adminLoginSchema), loginAdmin)

adminRoutes.post("/logout", authLayer, requireAdmin, logoutAdmin)

adminRoutes.get("/search", validate(globalSearchSchema), authLayer, requireAdmin, globalSearchForAdmin)

//ADMIN & SUPER ADMIN MODERATION ROUTES
adminRoutes.get("/invites", authLayer, requireSuperAdmin, getInvites)

adminRoutes.delete("/invites/revoke/:inviteId", authLayer, requireSuperAdmin, validate(revokeInviteSchema), revokeInvite)

adminRoutes.get("/listings/pre-harvested", authLayer, requireAdmin, validate(getAllListingSchema), getAllPreHarvestedListing)

adminRoutes.get("/listings/pre-harvested/:productId", authLayer, requireAdmin, validate(getSingleListing), getSinglePreHarvestedListing)

adminRoutes.get("/listings/harvested", authLayer, requireAdmin, validate(getAllListingSchema), getAllProductListing)

adminRoutes.get("/listings/harvested/:productId", authLayer, requireAdmin, validate(getSingleListing), getSingleProductListing)

adminRoutes.patch("/listings/pre-harvested/:listingId/moderate", authLayer, requireAdmin, validate(moderateListingSchema), moderatePreHarvestListing)

adminRoutes.patch("/listings/harvested/:listingId/moderate", authLayer, requireAdmin, validate(moderateListingSchema), moderateProductListing)

adminRoutes.get("/queries", authLayer, requireAdmin, validate(getAllQuerySchema), getAllQuery)

adminRoutes.get("/reports", authLayer, requireAdmin, validate(getAllReportsSchema), getAllReports)

adminRoutes.get("/queries/:queryId", authLayer, requireAdmin, validate(viewSingleQuerySchema), getSingleQuery)

adminRoutes.get("/reports/:reportId", authLayer, requireAdmin, validate(getSingleReportSchema), getSingleReport)

adminRoutes.patch("/queries/:queryId/status", authLayer, requireAdmin, validate(updateQuerySchema), changeQueryStatus)

adminRoutes.patch("/queries/:queryId/priority", authLayer, requireAdmin, validate(updateQuerySchema), changeQueryPriority)

adminRoutes.patch("/queries/:queryId/reply", authLayer, requireAdmin, validate(replyQuerySchema), replyToQuery)

adminRoutes.patch("/reports/:reportId/reply", authLayer, requireAdmin, validate(replyReportSchema), replyToReport)

adminRoutes.get("/farmer", authLayer, requireAdmin, validate(getAllFarmerSchema), getAllFarmer)

adminRoutes.get("/farmer/:farmerId", authLayer, requireAdmin, validate(getFarmerByIdSchema), getFarmerById)

adminRoutes.patch("/farmer/:farmerId/block", authLayer, requireAdmin, validate(blockFarmerSchema), blockFarmer)

adminRoutes.patch("/farmer/:farmerId/unblock", authLayer, requireAdmin, validate(unBlockFarmerSchema), unBlockFarmer)

adminRoutes.get("/buyer", authLayer, requireAdmin, validate(getAllBuyerSchema), getAllBuyer)

adminRoutes.get("/buyer/:buyerId", authLayer, requireAdmin, validate(getBuyerByIdSchema), getBuyerById)

adminRoutes.patch("/buyer/:buyerId/block", authLayer, requireAdmin, validate(blockBuyerSchema), blockBuyer)

adminRoutes.patch("/buyer/:buyerId/unblock", authLayer, requireAdmin, validate(unBlockBuyerSchema), unBlockBuyer)

adminRoutes.get("/dashboard", authLayer, requireAdmin, getAdminDashboard)