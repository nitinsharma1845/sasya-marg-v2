import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from "../utils/apiResponse.js";
import { createPreHarvestListingService, getPreHarvestListingService, getMyPreHarvestListingService, getSinglePreharvestListingService, updatePreHarvestListingService } from '../services/preHarvestListing.service.js';


export const createPreHarvestList = asyncHandler(async (req, res) => {
    const { payload } = req.body
    const farmerId = req.user._id
    const files = req.files

    const listing = await createPreHarvestListingService({ farmerId, payload, files })

    req.activityLog = {
        userId: req.user._id,
        role: "farmer",
        action: "LISTING_CREATED",
        message: "New pre-harvest crop is listed by farmer.",
        metadata: {
            farmerId: req.user._id,
            listingId: listing._id,
            productType: "pre-harvest"
        }
    }

    return res.status(201).json(new ApiResponse(201, listing, "Product listed successfully"))
})


export const getPreHarvestedListings = asyncHandler(async (req, res) => {
    const { listings, pagination } = await getPreHarvestListingService(req.query)

    return res.status(200).json(new ApiResponse(200, { listings, pagination }, "Listing Feteched Successfully"))
})

export const getMyPreHarvestedListings = asyncHandler(async (req, res) => {
    const farmerId = req.user._id
    const { listings, pagination } = await getMyPreHarvestListingService(farmerId, req.query)

    return res.status(200).json(new ApiResponse(200, { listings, pagination }, "Listing Feteched Successfully"))
})

export const getSinglePreharvestListing = asyncHandler(async (req, res) => {
    const { listingId } = req.params

    const listing = await getSinglePreharvestListingService(req.user._id, req.user.role, listingId)

    return res.status(200).json(new ApiResponse(200, listing, "Listing fetched successfully"))
})


export const updatePreHarvestListing = asyncHandler(async (req, res) => {
    const { listingId } = req.params
    const farmerId = req.user._id
    const payload = req.body

    const listing = await updatePreHarvestListingService(listingId, farmerId, payload)

    req.activityLog = {
        userId: req.user._id,
        role: "farmer",
        action: "LISTING_UPDATED",
        message: "pre-harvest crop listing is updated by farmer.",
        metadata: {
            farmerId: req.user._id,
            listingId: listing._id,
            productType: "pre-harvest"
        }
    }

    return res.status(201).json(new ApiResponse(201, listing, "Listing update successfully"))
})