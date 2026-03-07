import { Router } from "express"

import {
    createProduct,
    getMyProducts,
    updateProduct,
    toggleProductStatus,
    getProductById,
    updatePrice,
    updateStock
} from "../controllers/product.controller.js"

import {
    createProductSchema,
    updateProductSchema,
    myProductListingQuerySchema,
    toggleProductSchema,
    getProductByIdSchema,
    updatePriceSchema,
    updateStockSchema
} from "../validator/product.validator.js"

import { validate } from "../middleware/validate.middleware.js"
import { authLayer } from "../middleware/auth.middleware.js"
import { authorize } from "../middleware/role.middleware.js"
import { upload } from "../middleware/multer.middleware.js"
import { activeFarmer } from "../middleware/aciveFarmer.middleware.js"
import { createApiLimiter, normalApiLimiter, updateApiLimiter } from "../middleware/rate limiter/authRateLimiter.js"

export const productRouter = Router()

productRouter.post(
    "/",
    createApiLimiter,
    authLayer,
    authorize("farmer"),
    activeFarmer,
    upload.array("images", 5),
    validate(createProductSchema),
    createProduct
)

productRouter.get(
    "/me",
    normalApiLimiter,
    authLayer,
    authorize("farmer"),
    activeFarmer,
    validate(myProductListingQuerySchema),
    getMyProducts
)

productRouter.get(
    "/:listingId",
    normalApiLimiter,
    authLayer,
    authorize("farmer"),
    activeFarmer,
    validate(getProductByIdSchema),
    getProductById
)

productRouter.patch(
    "/:listingId",
    updateApiLimiter,
    authLayer,
    authorize("farmer"),
    activeFarmer,
    validate(updateProductSchema),
    updateProduct
)

productRouter.patch(
    "/update-price/:listingId",
    updateApiLimiter,
    authLayer,
    authorize("farmer"),
    activeFarmer,
    validate(updatePriceSchema),
    updatePrice
)

productRouter.patch(
    "/update-stock/:listingId",
    updateApiLimiter,
    authLayer,
    authorize("farmer"),
    activeFarmer,
    validate(updateStockSchema),
    updateStock
)

productRouter.patch(
    "/:listingId/toggle",
    updateApiLimiter,
    authLayer,
    authorize("farmer"),
    activeFarmer,
    validate(toggleProductSchema),
    toggleProductStatus
)


