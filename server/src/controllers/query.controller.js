import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/apiResponse.js'
import { closeQueryService, createQueryService, updateQueryService, viewMyQuerySevice, viewSingleQueryService } from '../services/query.service.js'



export const createQuery = asyncHandler(async (req, res) => {
    const farmerId = req.user._id

    const query = await createQueryService({ farmerId, payload: req.body })

    req.activityLog = {
        userId: req.user._id,
        role: "farmer",
        action: "QUERY_RAISED",
        message: "A new query is raised by farmer.",
        metadata: {
            farmerId: req.user._id,
            queryId: query._id,
        }
    }

    return res.status(201).json(new ApiResponse(201, query, "Query created successfully"))
})

export const viewMyQuery = asyncHandler(async (req, res) => {
    const farmerId = req.user._id

    const queriesData = await viewMyQuerySevice(farmerId, req.query)

    return res.status(200).json(new ApiResponse(200, queriesData, "Query fetched successfull"))
})

export const viewSingleQuery = asyncHandler(async (req, res) => {
    const user = req.user
    const { queryId } = req.params

    const query = await viewSingleQueryService(user, queryId)

    return res.status(200).json(new ApiResponse(200, query, "Query fetched successfully"))
})

export const updateQuery = asyncHandler(async (req, res) => {
    const farmerId = req.user._id
    const queryId = req.params.queryId
    const { message, subject } = req.body

    const query = await updateQueryService({ farmerId, queryId, message, subject })

    req.activityLog = {
        userId: req.user._id,
        role: "farmer",
        action: "QUERY_UPDATED",
        message: "Query is updated by farmer.",
        metadata: {
            farmerId: req.user._id,
            queryId: query._id,
            message,
            subject
        }
    }

    return res.status(200).json(new ApiResponse(200, query, "Query updated Successfully"))
})

export const closeQuery = asyncHandler(async (req, res) => {
    const farmerId = req.user._id
    const { queryId } = req.params

    const query = await closeQueryService({ farmerId, queryId })

    req.activityLog = {
        userId: req.user._id,
        role: "farmer",
        action: "QUERY_CLOSED",
        message: "Query is closed by farmer.",
        metadata: {
            farmerId: req.user._id,
            queryId: query._id,
        }
    }

    return res.status(200).json(
        new ApiResponse(200, query, "Query closed successfully")
    )
})
