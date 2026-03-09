import { GovernmentScheme } from "../models/governmentScheme.model.js"
import { Farmer } from "../models/farmer.model.js"
import { FarmLand } from "../models/farmLand.model.js"
import mongoose from "mongoose"
import { createBulkNotifications } from "./notification.service.js"


const convertToAcre = (value, unit) => {
    switch (unit) {
        case "acre": return value
        case "hectare": return value * 2.471
        case "sqm": return value * 0.000247
        case "sqft": return value * 0.0000229568
        case "beegha": return value * 0.62
        default: return value
    }
}

export const createSchemeService = async (payload) => {

    const scheme = await GovernmentScheme.create(payload)

    const farmers = await Farmer.find({}, "_id")

    await createBulkNotifications({
        users: farmers,
        role: "farmer",
        type: "NEW_SCHEME",
        title: "New Government Scheme",
        message: `${scheme.title} scheme is now available for farmers.`,
        entityId: scheme._id,
        entityType: "scheme",
        redirectUrl: `/farmer/schemes/${scheme._id}`
    })

    return scheme
}

export const getAllSchemesAdminService = async (query) => {

    const { page = 1, limit = 10, isActive, state, crop, search } = query

    const filter = {}

    if (search?.trim()) {
        const regex = new RegExp(search?.trim(), "i")
        const condition = [
            { title: regex },
        ]

        if (mongoose.Types.ObjectId.isValid(search)) {
            condition.push({ _id: search })
        }

        filter.$or = condition
    }

    if (isActive !== undefined) filter.isActive = isActive === "true"
    if (state) filter["eligibility.states"] = state
    if (crop) filter["eligibility.cropTypes"] = crop

    const skip = (page - 1) * limit

    const [schemes, total] = await Promise.all([
        GovernmentScheme.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit)),

        GovernmentScheme.countDocuments(filter)
    ])

    return {
        schemes,
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            pages: Math.ceil(total / limit)
        }
    }
}

export const updateSchemeService = async (id, payload) => {
    return await GovernmentScheme.findByIdAndUpdate(id, payload, { new: true })
}

export const toggleSchemeService = async (id) => {
    const scheme = await GovernmentScheme.findById(id)
    scheme.isActive = !scheme.isActive
    await scheme.save()
    return scheme
}

export const getSchemesForFarmerService = async ({ farmerId, farmLandId }) => {

    const farmer = await Farmer.findById(farmerId)
    const farmLand = await FarmLand.findById(farmLandId)

    const filter = {
        isActive: true,
        validFrom: { $lte: new Date() },
        validTill: { $gte: new Date() }
    }

    filter["eligibility.states"] = farmer.address.state
    filter["eligibility.landSizeMin"] = { $lte: farmLand.size }
    filter["eligibility.landSizeMax"] = { $gte: farmLand.size }

    return await GovernmentScheme.find(filter).sort({ createdAt: -1 })
}

export const getAllSchemesFarmerService = async (query) => {
    const { page = 1, limit = 10, state, search, farmlandId } = query

    const skip = (page - 1) * limit


    const filter = { isActive: true }

    if (search) {
        filter.title = { $regex: search, $options: "i" }
    }

    if (state) {
        filter["eligibility.states"] = state
    }


    if (!farmlandId) {
        const [schemes, total] = await Promise.all([
            GovernmentScheme.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(Number(limit)),

            GovernmentScheme.countDocuments(filter)
        ])

        return {
            schemes,
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total / limit)
            }
        }
    }



    const farmland = await FarmLand.findById(farmlandId).populate("location")
    if (!farmland) {
        return { schemes: [], pagination: { total: 0, page: 1, limit, pages: 0 } }
    }

    const landSizeInAcre = convertToAcre(
        farmland.size.value,
        farmland.size.unit
    )

    const farmerState = farmland.location?.state

    const schemes = await GovernmentScheme.find(filter).sort({ createdAt: -1 })

    const eligibleSchemes = schemes.filter((scheme) => {
        const e = scheme.eligibility || {}

        const stateEligible =
            !e.states?.length || e.states.includes(farmerState)

        const minEligible =
            e.landSizeMin == null || landSizeInAcre >= e.landSizeMin

        const maxEligible =
            e.landSizeMax == null || landSizeInAcre <= e.landSizeMax

        return stateEligible && minEligible && maxEligible
    })

    const paginatedSchemes = eligibleSchemes.slice(
        skip,
        skip + Number(limit)
    )

    return {
        schemes: paginatedSchemes,
        pagination: {
            total: eligibleSchemes.length,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(eligibleSchemes.length / limit)
        }
    }
}

export const getSingleSchemeService = async ({ schemeId, user }) => {

    const filter = {
        _id: schemeId
    }

    if (user.role === 'farmer') {
        filter.isActive = true
    }
    const scheme = await GovernmentScheme.findOne(filter)

    if (!scheme) throw new ApiError(404, "Scheme not found on inactive")

    return scheme
}