import { Router } from 'express'
import { validate } from '../middleware/validate.middleware.js'
import { authLayer } from '../middleware/auth.middleware.js'
import { authorize } from '../middleware/role.middleware.js'
import { addWishlistSchema, getWishlistSchema, removeWishlistSchema, } from '../validator/wishList.validator.js'
import { addWishlistItem, getMyWishlist, removeWishlistItem } from '../controllers/wishList.controller.js'
import { normalApiLimiter, wishlistApiLimiter } from '../middleware/rate limiter/authRateLimiter.js'

export const wishListRouter = Router()

wishListRouter.post("/", wishlistApiLimiter, authLayer, authorize("buyer"), validate(addWishlistSchema), addWishlistItem)
wishListRouter.delete("/:listingId", wishlistApiLimiter, authLayer, authorize("buyer"), validate(removeWishlistSchema), removeWishlistItem)
wishListRouter.get("/", normalApiLimiter, authLayer, authorize("buyer"), validate(getWishlistSchema), getMyWishlist)