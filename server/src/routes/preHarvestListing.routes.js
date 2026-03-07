import { Router } from 'express'
import { validate } from '../middleware/validate.middleware.js'
import { authLayer } from '../middleware/auth.middleware.js'
import { upload } from '../middleware/multer.middleware.js'
import { createPreHarvestListingSchema, getMyPreHarvestListingQuerySchema, getPreHarvestListingQuerySchema, getSinglePreHarvestListingSchema, updatePreHarvestListingSchema } from '../validator/preHarvestListing.validator.js'
import { authorize } from '../middleware/role.middleware.js'
import { createPreHarvestList, getMyPreHarvestedListings, getPreHarvestedListings, getSinglePreharvestListing, updatePreHarvestListing } from '../controllers/preHarvestListing.controller.js'
import { parsePayload } from '../middleware/parsePayload.middleware.js'
import { activeFarmer } from '../middleware/aciveFarmer.middleware.js'
import { createApiLimiter, normalApiLimiter, updateApiLimiter } from '../middleware/rate limiter/authRateLimiter.js'


export const preHarvestListingRoute = Router()


preHarvestListingRoute.post("/", createApiLimiter, authLayer, authorize("farmer"), activeFarmer, upload.array("images", 5), parsePayload
    , validate(createPreHarvestListingSchema), createPreHarvestList)


preHarvestListingRoute.get('/', normalApiLimiter, validate(getPreHarvestListingQuerySchema), getPreHarvestedListings)

preHarvestListingRoute.get("/my", normalApiLimiter, authLayer, authorize("farmer"), activeFarmer, validate(getMyPreHarvestListingQuerySchema), getMyPreHarvestedListings)

preHarvestListingRoute.get('/:listingId', normalApiLimiter, authLayer, authorize("farmer", "buyer", "admin"), validate(getSinglePreHarvestListingSchema), getSinglePreharvestListing)

preHarvestListingRoute.patch('/:listingId', updateApiLimiter, authLayer, authorize("farmer"), activeFarmer, validate(updatePreHarvestListingSchema), updatePreHarvestListing)