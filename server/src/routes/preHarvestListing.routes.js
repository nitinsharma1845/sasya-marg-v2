import { Router } from 'express'
import { validate } from '../middleware/validate.middleware.js'
import { authLayer } from '../middleware/auth.middleware.js'
import { upload } from '../middleware/multer.middleware.js'
import { createPreHarvestListingSchema, getMyPreHarvestListingQuerySchema, getPreHarvestListingQuerySchema, getSinglePreHarvestListingSchema, updatePreHarvestListingSchema } from '../validator/preHarvestListing.validator.js'
import { authorize } from '../middleware/role.middleware.js'
import { createPreHarvestList, getMyPreHarvestedListings, getPreHarvestedListings, getSinglePreharvestListing, updatePreHarvestListing } from '../controllers/preHarvestListing.controller.js'
import { parsePayload } from '../middleware/parsePayload.middleware.js'
import { activeFarmer } from '../middleware/aciveFarmer.middleware.js'


export const preHarvestListingRoute = Router()


preHarvestListingRoute.post("/", authLayer, authorize("farmer"), activeFarmer, upload.array("images", 5), parsePayload
    , validate(createPreHarvestListingSchema), createPreHarvestList)


preHarvestListingRoute.get('/', validate(getPreHarvestListingQuerySchema), getPreHarvestedListings)

preHarvestListingRoute.get("/my", authLayer, authorize("farmer"), activeFarmer, validate(getMyPreHarvestListingQuerySchema), getMyPreHarvestedListings)

preHarvestListingRoute.get('/:listingId', authLayer, authorize("farmer", "buyer", "admin"), validate(getSinglePreHarvestListingSchema), getSinglePreharvestListing)

preHarvestListingRoute.patch('/:listingId', authLayer, authorize("farmer"), activeFarmer, validate(updatePreHarvestListingSchema), updatePreHarvestListing)