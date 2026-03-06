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

export const buyerRouter = Router()



buyerRouter.post(
    "/auth/register",
    validate(registerBuyerSchema),
    registerBuyer
)


buyerRouter.post(
    "/auth/login/password",
    validate(loginBuyerWithPasswordSchema),
    loginBuyerWithPassword
)


buyerRouter.post(
    "/auth/login/otp",
    validate(loginBuyerWithOtpSchema),
    loginBuyerWithOtp
)


buyerRouter.put(
    "/auth/forgot-password",
    validate(forgotBuyerPasswordSchema),
    forgotPassword
)



buyerRouter.post("/logout", authLayer, authorize("buyer"), logoutBuyer)

buyerRouter.get("/me", authLayer, authorize("buyer"), currentUser)

buyerRouter.use(authLayer, authorize("buyer"), activeBuyer)




buyerRouter.put(
    "/auth/change-password",
    validate(changeBuyerPasswordSchema),
    changePassword
)

buyerRouter.put("/update-profile", validate(updateBuyerProfileSchema), updateBuyerProfile)


buyerRouter.patch(
    "/address",
    validate(updateBuyerAddressSchema),
    updateBuyerAddress
)

buyerRouter.get("/dashboard", buyerDashbord)


buyerRouter.get("/listing/pre-harvest", validate(getPreHarvestListingQuerySchema), getPreHarvestedListings)
buyerRouter.get("/listing/pre-harvest/:listingId", validate(getProductByIdSchema), getSinglePreHarvestProductListing)
buyerRouter.get("/listing", validate(getProductListingSchema), getProductListings)
buyerRouter.get("/listing/:listingId", validate(getProductByIdSchema), getSingleProductListings)