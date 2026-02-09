import { ApiError } from '../utils/apiError.js'
import { PreHarvestListing } from '../models/preHarvetedListing.model.js'
import { FarmLand } from '../models/farmLand.model.js'
import { uploadToCloudinary, deleteUploadedFile } from '../utils/upload.cloudinary.js'
import { Location } from '../models/location.model.js'
import { validatePreHarvestDates } from '../utils/validatePreHravestDates.js'


export const createPreHarvestListingService = async ({ farmerId, payload, files }) => {

    const { sowingDate, expectedHarvest } = payload

    const farmLand = await FarmLand.findOne({
        owner: farmerId,
        _id: payload.farmland,
        isActive: true
    })

    if (!farmLand) throw new ApiError(403, "Invalid or Inactive farmland")

    if (
        expectedHarvest &&
        new Date(expectedHarvest) <= new Date(sowingDate)
    ) {
        throw new ApiError(
            400,
            "Harvested date must be after sowing date"
        );
    }

    let images = []

    if (files && files.length > 0) {
        for (let file of files) {

            const { url, publicId } = await uploadToCloudinary(file.path)
            images.push({ url, publicId })
        }
    }

    let status = "open";

    if (expectedHarvest && new Date() > new Date(expectedHarvest)) {
        status = "harvested";
    }


    const listing = await PreHarvestListing.create({
        farmer: farmerId,
        ...payload,
        images,
        status,
        moderation: "pending"
    })

    return listing
}

export const getPreHarvestListingService = async (query) => {
    const {
        page = 1,
        limit = 10,
        state,
        district,
        qualityGrade,
        minPrice,
        maxPrice,
        sort,
        category
    } = query


    const filter = {
        moderation: 'approved',
    }


    if (state || district) {
        const locationQuery = {}

        if (state) locationQuery.state = state
        if (district) locationQuery.district = district

        const locations = await Location.find(locationQuery).select("_id")

        if (!locations || locations.length < 1) {
            return {
                listings: [],
                pagination: {
                    total: 0,
                    page: Number(page),
                    limit: Number(limit),
                    totalPage: 0
                }
            }
        }

        const farmlands = await FarmLand.find({
            location: { $in: locations.map(f => f._id) },
            isActive: true
        }).select("_id")

        if (!farmlands.length) {
            return {
                listings: [],
                pagination: {
                    total: 0,
                    page: Number(page),
                    limit: Number(limit),
                    totalPage: 0
                }
            }
        }

        filter.farmland = { $in: farmlands.map(f => f._id) }
    }

    if (qualityGrade) {
        filter.qualityGrade = qualityGrade
    }

    if (minPrice || maxPrice) {
        filter["expectedPrice.value"] = {}
        if (minPrice) filter["expectedPrice.value"].$gte = Number(minPrice)
        if (maxPrice) filter["expectedPrice.value"].$lte = Number(maxPrice)
    }

    let sortOption = { createdAt: -1 }

    if (sort === "price_asc") {
        sortOption = { "expectedPrice.value": 1 }
    }

    if (sort === "price_desc") {
        sortOption = { "expectedPrice.value": -1 }
    }

    if (category) {
        filter.category = category
    }

    const skip = (Number(page) - 1) * Number(limit)

    const [listings, total] = await Promise.all([
        PreHarvestListing.find(filter).populate([
            {
                path: "farmland",
                select: "name size location",
                populate: {
                    path: 'location',
                    select: "city state district "
                }
            },
            {
                path: "farmer",
                select: "fullname isActive",
                match: { isActive: true }
            }
        ]).sort(sortOption)
            .skip(skip)
            .limit(limit),

        PreHarvestListing.countDocuments(filter)
    ])


    return {
        listings,
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit)
        }
    }

}

export const getMyPreHarvestListingService = async (farmerId, query) => {
    const { page = 1, limit = 10, status, moderation, search } = query

    const filter = {
        farmer: farmerId
    }

    if (status) {
        filter.status = status
    }

    if (moderation) {
        filter.moderation = moderation
    }

    if (search !== undefined) {
        filter.title = { $regex: search, $options: "i" }
    }

    const skip = (Number(page) - 1) * limit

    const [listings, total] = await Promise.all([
        PreHarvestListing.find(filter).populate({
            path: "farmland",
            select: "location name size",
            populate: {
                path: "location",
                select: "state locality district "
            }
        }).sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit)),

        PreHarvestListing.countDocuments(filter)
    ])

    return {
        listings,
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit)
        }
    }
}

export const getSinglePreharvestListingService = async (farmerId, role, listingId) => {
    const listing = await PreHarvestListing.findById(listingId).populate({
        path: "farmer",
        select: "fullname phone isContactVisible"
    })
        .populate({
            path: "farmland",
            select: "name size soilType farmingType",
            populate: {
                path: "location",
                select: "locality state district"
            }
        })

    if (!listing) {
        throw new ApiError(404, "Listing not found")
    }

    if (role === 'buyer') {
        if (listing.moderation !== "approved" || listing.status !== "open") {
            throw new ApiError(403, "This listing is not available")
        }
    }

    if (role === 'farmer') {
        if (listing.farmer._id.toString() !== farmerId.toString()) {
            throw new ApiError(403, "Access denied")
        }
    }

    if (role === 'buyer' && listing.farmer.isContactVisible === false) {
        listing.farmer.phone = false
    }

    return listing
}

export const updatePreHarvestListingService = async (listingId, farmerId, payload, files = null) => {

    const listing = await PreHarvestListing.findById(listingId)

    validatePreHarvestDates({ newSowingDate: payload?.sowingDate, newHarvestedDate: payload?.expectedHarvest, existingSowingDate: listing.sowingDate, existingHarvestedDate: listing.expectedHarvest })


    if (!listing) throw new ApiError(404, "Listing not found")

    if (listing.farmer.toString() !== farmerId.toString()) {
        throw new ApiError(403, "You are not allowed to update listing")
    }

    if (listing.moderation === "rejected") {
        throw new ApiError(403, "You are not allowed to update listing as it is rejected!")
    }

    const allowedFields = [
        "title",
        "description",
        "expectedHarvest",
        "expectedyeild",
        "expectedPrice",
        "qualityGrade",
        "minimumOrderQuantity",
        "sowingDate",
        "status"
    ]


    for (const field of allowedFields) {
        if (payload[field] !== undefined) {
            listing[field] = payload[field]
        }
    }


    //IMAGE REMOVAL OR ADDITION LOGIC HERE 


    listing.moderation = 'pending'
    await listing.save()

    return listing
}

export const getSinglePreHarvestProductForBuyer = async (listingId) => {
    const listing = await PreHarvestListing.findById(listingId).populate([
        {
            path: "farmland",
            select: "size name location -_id farmingType soilType",
            populate: {
                path: "location",
                select: "locality state district"
            }
        },
        {
            path: "farmer",
            select: "fullname phone isContactVisible email createdAt"
        }
    ])

    if (listing.farmer.isContactVisible === false) {
        listing.farmer.phone = false
    }
    return listing
}