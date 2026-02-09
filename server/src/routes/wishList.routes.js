import { Router } from 'express'
import { validate } from '../middleware/validate.middleware.js'
import { authLayer } from '../middleware/auth.middleware.js'
import { authorize } from '../middleware/role.middleware.js'
import { addWishlistSchema, getWishlistSchema, removeWishlistSchema, } from '../validator/wishList.validator.js'
import { addWishlistItem, getMyWishlist, removeWishlistItem } from '../controllers/wishList.controller.js'

export const wishListRouter = Router()

wishListRouter.post("/", authLayer, authorize("buyer"), validate(addWishlistSchema), addWishlistItem)
wishListRouter.delete("/:listingId", authLayer, authorize("buyer"), validate(removeWishlistSchema), removeWishlistItem)
wishListRouter.get("/", authLayer, authorize("buyer"), validate(getWishlistSchema), getMyWishlist)