import { Router } from "express"

import {
    registerBuyer,
    loginBuyerWithPassword,
    loginBuyerWithOtp,
    forgotPassword,
    changePassword,
    currentUser,
    updateBuyerAddress,
    logoutBuyer,
    getPreHarvestedListings,
    getProductListings,
    buyerDashbord,
    getSingleProductListings,
    updateBuyerProfile,
    getSinglePreHarvestProductListing
} from "../controllers/buyer.controller.js"

import {
    registerBuyerSchema,
    loginBuyerWithPasswordSchema,
    loginBuyerWithOtpSchema,
    forgotBuyerPasswordSchema,
    changeBuyerPasswordSchema,
    updateBuyerAddressSchema,
    updateBuyerProfileSchema
} from "../validator/buyer.validator.js"

import { validate } from "../middleware/validate.middleware.js"
import { authLayer } from "../middleware/auth.middleware.js"
import { authorize } from "../middleware/role.middleware.js"
import { getPreHarvestListingQuerySchema } from "../validator/preHarvestListing.validator.js"
import { getProductByIdSchema, getProductListingSchema } from "../validator/product.validator.js"
import { activeBuyer } from "../middleware/activeBuyer.middleware.js"
import { authApiLimiter, normalApiLimiter, updateApiLimiter } from "../middleware/rate limiter/authRateLimiter.js"

export const buyerRouter = Router()

buyerRouter.post(
    "/auth/register",
    authApiLimiter,
    validate(registerBuyerSchema),
    registerBuyer
)

buyerRouter.post(
    "/auth/login/password",
    authApiLimiter,
    validate(loginBuyerWithPasswordSchema),
    loginBuyerWithPassword
)

buyerRouter.post(
    "/auth/login/otp",
    authApiLimiter,
    validate(loginBuyerWithOtpSchema),
    loginBuyerWithOtp
)

buyerRouter.put(
    "/auth/forgot-password",
    authApiLimiter,
    validate(forgotBuyerPasswordSchema),
    forgotPassword
)

buyerRouter.post(
    "/logout",
    authApiLimiter,
    authLayer,
    authorize("buyer"),
    logoutBuyer
)

buyerRouter.get(
    "/me",
    normalApiLimiter,
    authLayer,
    authorize("buyer"),
    currentUser
)

buyerRouter.use(authLayer, authorize("buyer"), activeBuyer)

buyerRouter.put(
    "/auth/change-password",
    updateApiLimiter,
    validate(changeBuyerPasswordSchema),
    changePassword
)

buyerRouter.put(
    "/update-profile",
    updateApiLimiter,
    validate(updateBuyerProfileSchema),
    updateBuyerProfile
)

buyerRouter.patch(
    "/address",
    updateApiLimiter,
    validate(updateBuyerAddressSchema),
    updateBuyerAddress
)

buyerRouter.get(
    "/dashboard",
    normalApiLimiter,
    buyerDashbord
)

buyerRouter.get(
    "/listing/pre-harvest",
    normalApiLimiter,
    validate(getPreHarvestListingQuerySchema),
    getPreHarvestedListings
)

buyerRouter.get(
    "/listing/pre-harvest/:listingId",
    normalApiLimiter,
    validate(getProductByIdSchema),
    getSinglePreHarvestProductListing
)

buyerRouter.get(
    "/listing",
    normalApiLimiter,
    validate(getProductListingSchema),
    getProductListings
)

buyerRouter.get(
    "/listing/:listingId",
    normalApiLimiter,
    validate(getProductByIdSchema),
    getSingleProductListings
)