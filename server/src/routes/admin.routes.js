import { Router } from "express"
import { validate } from "../middleware/validate.middleware.js"
import { adminLoginSchema, blockBuyerSchema, blockFarmerSchema, bootstrapSuperAdminSchema, changeEmailSchema, changeNameSchema, changePasswordSchema, changePhoneNumberSchema, getAdminByIdSchema, getAdminLogsSchema, getAllAdminSchema, getAllBuyerSchema, getAllFarmerSchema, getAllListingSchema, getAllQuerySchema, getAllReportsSchema, getBuyerByIdSchema, getFarmerByIdSchema, getNewsletterSubscribers, getSingleListing, getSingleReportSchema, globalSearchSchema, moderateListingSchema, registerAdminSchema, replyQuerySchema, replyReportSchema, revokeInviteSchema, unBlockBuyerSchema, unBlockFarmerSchema, updateQuerySchema } from "../validator/admin.validator.js"
import { blockBuyer, blockFarmer, bootstrapSuperAdmin, bootStrapSuperAdminLogin, bootstrapSuperAdminLogout, changeEmail, changeFullname, changePassword, changePhone, changeQueryPriority, changeQueryStatus, createAdminInvite, getAdminById, getAdminDashboard, getAdminProfile, getAllAdmins, getAllBuyer, getAllFarmer, getAllPreHarvestedListing, getAllProductListing, getAllPublicQueries, getAllQuery, getAllReports, getBuyerById, getFarmerById, getInvites, getSinglePreHarvestedListing, getSingleProductListing, getSingleQuery, getSingleReport, globalSearchForAdmin, globalSerachForSuperAdmin, loginAdmin, logoutAdmin, moderatePreHarvestListing, moderateProductListing, registerAdminWithInviteToken, replyToPublicQuery, replyToQuery, replyToReport, revokeInvite, superAdminDashboard, unBlockBuyer, unBlockFarmer } from "../controllers/admin.controller.js"
import { requireAdmin, requireSuperAdmin } from "../middleware/adminRole.middleware.js"
import { authLayer } from "../middleware/auth.middleware.js"
import { viewSingleQuerySchema } from "../validator/query.validator.js"
import { authorize } from "../middleware/role.middleware.js"
import { getLogs } from "../controllers/activityLog.controller.js"
import { getAllSubscribers } from "../controllers/newsletter.controller.js"
import { getAllPublicQueriesSchema, replyToPublicQuerySchema } from "../validator/public.validator.js"
import { authApiLimiter, createApiLimiter, normalApiLimiter, updateApiLimiter } from "../middleware/rate limiter/authRateLimiter.js"

export const adminRoutes = Router()


//invite admin route

adminRoutes.get('/super-admin/invite', createApiLimiter, authLayer, requireSuperAdmin, createAdminInvite)

//super Admin routes 

adminRoutes.post('/super-admin/register', authApiLimiter, validate(bootstrapSuperAdminSchema), bootstrapSuperAdmin)

adminRoutes.post('/super-admin/login', authApiLimiter, validate(adminLoginSchema), bootStrapSuperAdminLogin)

adminRoutes.post('/super-admin/logout', authApiLimiter, authLayer, requireSuperAdmin, bootstrapSuperAdminLogout)

adminRoutes.get("/super-admin/dashboard", normalApiLimiter, authLayer, requireSuperAdmin, superAdminDashboard)

adminRoutes.get("/super-admin/admins", normalApiLimiter, validate(getAllAdminSchema), authLayer, requireSuperAdmin, getAllAdmins)

adminRoutes.get("/super-admin/admin/:adminId", normalApiLimiter, validate(getAdminByIdSchema), authLayer, requireSuperAdmin, getAdminById)

adminRoutes.get("/super-admin/search", normalApiLimiter, validate(globalSearchSchema), authLayer, requireSuperAdmin, globalSerachForSuperAdmin)

adminRoutes.get("/super-admin/logs", normalApiLimiter, authLayer, requireSuperAdmin, validate(getAdminLogsSchema), getLogs)

//register Admin via inviteToken

adminRoutes.post("/register", authApiLimiter, validate(registerAdminSchema), registerAdminWithInviteToken)

adminRoutes.post("/login", authApiLimiter, validate(adminLoginSchema), loginAdmin)

adminRoutes.post("/logout", authApiLimiter, authLayer, requireAdmin, logoutAdmin)

adminRoutes.get("/search", normalApiLimiter, authLayer, requireAdmin, validate(globalSearchSchema), globalSearchForAdmin)

//ADMIN & SUPER ADMIN MODERATION ROUTES
adminRoutes.get("/invites", normalApiLimiter, authLayer, requireSuperAdmin, getInvites)

adminRoutes.delete("/invites/revoke/:inviteId", updateApiLimiter, authLayer, requireSuperAdmin, validate(revokeInviteSchema), revokeInvite)

adminRoutes.get("/listings/pre-harvested", normalApiLimiter, authLayer, requireAdmin, validate(getAllListingSchema), getAllPreHarvestedListing)

adminRoutes.get("/listings/pre-harvested/:productId", normalApiLimiter, authLayer, requireAdmin, validate(getSingleListing), getSinglePreHarvestedListing)

adminRoutes.get("/listings/harvested", normalApiLimiter, authLayer, requireAdmin, validate(getAllListingSchema), getAllProductListing)

adminRoutes.get("/listings/harvested/:productId", normalApiLimiter, authLayer, requireAdmin, validate(getSingleListing), getSingleProductListing)

adminRoutes.patch("/listings/pre-harvested/:listingId/moderate", updateApiLimiter, authLayer, requireAdmin, validate(moderateListingSchema), moderatePreHarvestListing)

adminRoutes.patch("/listings/harvested/:listingId/moderate", updateApiLimiter, authLayer, requireAdmin, validate(moderateListingSchema), moderateProductListing)

adminRoutes.get("/queries", normalApiLimiter, authLayer, requireAdmin, validate(getAllQuerySchema), getAllQuery)

adminRoutes.get("/reports", normalApiLimiter, authLayer, requireAdmin, validate(getAllReportsSchema), getAllReports)

adminRoutes.get("/queries/:queryId", normalApiLimiter, authLayer, requireAdmin, validate(viewSingleQuerySchema), getSingleQuery)

adminRoutes.get("/reports/:reportId", normalApiLimiter, authLayer, requireAdmin, validate(getSingleReportSchema), getSingleReport)

adminRoutes.patch("/queries/:queryId/status", updateApiLimiter, authLayer, requireAdmin, validate(updateQuerySchema), changeQueryStatus)

adminRoutes.patch("/queries/:queryId/priority", updateApiLimiter, authLayer, requireAdmin, validate(updateQuerySchema), changeQueryPriority)

adminRoutes.patch("/queries/:queryId/reply", updateApiLimiter, authLayer, requireAdmin, validate(replyQuerySchema), replyToQuery)

adminRoutes.patch("/reports/:reportId/reply", updateApiLimiter, authLayer, requireAdmin, validate(replyReportSchema), replyToReport)

adminRoutes.get("/farmer", normalApiLimiter, authLayer, requireAdmin, validate(getAllFarmerSchema), getAllFarmer)

adminRoutes.get("/farmer/:farmerId", normalApiLimiter, authLayer, authorize("admin", "super_admin"), validate(getFarmerByIdSchema), getFarmerById)

adminRoutes.patch("/farmer/:farmerId/block", updateApiLimiter, authLayer, requireAdmin, validate(blockFarmerSchema), blockFarmer)

adminRoutes.patch("/farmer/:farmerId/unblock", updateApiLimiter, authLayer, requireAdmin, validate(unBlockFarmerSchema), unBlockFarmer)

adminRoutes.get("/buyer", normalApiLimiter, authLayer, requireAdmin, validate(getAllBuyerSchema), getAllBuyer)

adminRoutes.get("/buyer/:buyerId", normalApiLimiter, authLayer, authorize("admin", "super_admin"), validate(getBuyerByIdSchema), getBuyerById)

adminRoutes.patch("/buyer/:buyerId/block", updateApiLimiter, authLayer, requireAdmin, validate(blockBuyerSchema), blockBuyer)

adminRoutes.patch("/buyer/:buyerId/unblock", updateApiLimiter, authLayer, requireAdmin, validate(unBlockBuyerSchema), unBlockBuyer)

adminRoutes.get("/newsletter", normalApiLimiter, authLayer, requireAdmin, validate(getNewsletterSubscribers), getAllSubscribers)

adminRoutes.get("/public-queries", normalApiLimiter, authLayer, requireAdmin, validate(getAllPublicQueriesSchema), getAllPublicQueries)

adminRoutes.post("/public-queries/:queryId/reply", updateApiLimiter, authLayer, requireAdmin, validate(replyToPublicQuerySchema), replyToPublicQuery)

adminRoutes.get("/dashboard", normalApiLimiter, authLayer, requireAdmin, getAdminDashboard)

//profile routes

adminRoutes.get("/", normalApiLimiter, authLayer, authorize("admin", "super_admin"), getAdminProfile)

adminRoutes.patch('/change-password', authApiLimiter, authLayer, requireAdmin, validate(changePasswordSchema), changePassword)

adminRoutes.patch('/change-name', updateApiLimiter, authLayer, requireAdmin, validate(changeNameSchema), changeFullname)

adminRoutes.patch("/change-phone", updateApiLimiter, authLayer, requireAdmin, validate(changePhoneNumberSchema), changePhone)

adminRoutes.patch("/change-email", updateApiLimiter, authLayer, requireAdmin, validate(changeEmailSchema), changeEmail)