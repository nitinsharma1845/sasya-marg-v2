import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { getAllSchemesFarmerService, getSchemesForFarmerService, getSingleSchemeService } from "../services/governmentSheme.service.js"

import {
    createSchemeService,
    getAllSchemesAdminService,
    updateSchemeService,
    toggleSchemeService
} from "../services/governmentSheme.service.js"



export const createScheme = asyncHandler(async (req, res) => {

    const scheme = await createSchemeService(req.body)

    req.activityLog = {
        userId: req.user._id,
        role: "admin",
        action: "SCHEME_CREATED",
        message: "New government scheme is added.",
        metadata: {
            adminId: req.user._id,
            schemeId: scheme._id,
        }
    }

    return res
        .status(201)
        .json(new ApiResponse(201, scheme, "Government scheme created successfully"))
})

export const getAllSchemesAdmin = asyncHandler(async (req, res) => {

    const data = await getAllSchemesAdminService(req.query)

    return res
        .status(200)
        .json(new ApiResponse(200, data, "Schemes fetched successfully"))
})

export const updateScheme = asyncHandler(async (req, res) => {

    const { id } = req.params

    const scheme = await updateSchemeService(id, req.body)

    req.activityLog = {
        userId: req.user._id,
        role: "admin",
        action: "SCHEME_UPDATED",
        message: "Exists government scheme is updated by admin.",
        metadata: {
            adminId: req.user._id,
            schemeId: scheme._id,
        }
    }

    return res
        .status(200)
        .json(new ApiResponse(200, scheme, "Scheme updated successfully"))
})

export const toggleScheme = asyncHandler(async (req, res) => {

    const { id } = req.params

    const scheme = await toggleSchemeService(id)

    req.activityLog = {
        userId: req.user._id,
        role: "admin",
        action: "SCHEME_CREATED",
        message: "government scheme's status is changed by admin.",
        metadata: {
            adminId: req.user._id,
            schemeId: scheme._id,
            isActive: scheme.isActive
        }
    }

    return res
        .status(200)
        .json(new ApiResponse(200, scheme, "Scheme status updated successfully"))
})

export const getSchemesForFarmer = asyncHandler(async (req, res) => {

    const farmerId = req.user._id
    const { farmLandId } = req.query

    const schemes = await getSchemesForFarmerService({
        farmerId,
        farmLandId
    })

    return res
        .status(200)
        .json(new ApiResponse(200, schemes, "Eligible schemes fetched successfully"))
})

export const getAllSchemesForFarmer = asyncHandler(async (req, res) => {


    const { schemes, pagination } = await getAllSchemesFarmerService(req.query)

    return res
        .status(200)
        .json(new ApiResponse(200, { schemes, pagination }, "Eligible schemes fetched successfully"))
})

export const getSingleScheme = asyncHandler(async (req, res) => {
    const { schemeId } = req.params
    const user = req.user

    const scheme = await getSingleSchemeService({ schemeId, user })

    return res.status(200).json(new ApiResponse(200, scheme, "Scheme fetched Successfully"))
})