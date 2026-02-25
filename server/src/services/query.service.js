import { Query } from "../models/query.model.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"

export const createQueryService = async ({ payload, farmerId }) => {
    const query = await Query.create({
        ...payload,
        farmer: farmerId,
        status: "open",
    })

    return query
}

export const viewMyQuerySevice = async (farmerId, query = {}) => {

    const { page = 1, limit = 10, status } = query

    const filter = { farmer: farmerId }

    if (status) {
        filter.status = status
    }

    const skip = (Number(page) - 1) * Number(limit)

    const [queries, total] = await Promise.all([
        Query.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit))
            .lean(),

        Query.countDocuments(filter)
    ])




    return {
        queries,
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit)
        }
    }
}


export const viewSingleQueryService = async (user, queryId) => {
    const filter = { _id: queryId }

    if (user.role === "farmer") {
        filter.farmer = user._id
    }
    const query = await Query.findOne(filter).select("inquiry subject message adminReply repliedAt status priority").populate("farmer", "fullname phone email")

    if (!query) {
        throw new ApiError(404, "No query found")
    }

    return query
}

export const updateQueryService = async ({ farmerId, queryId, subject, message }) => {
    const query = await Query.findOne({ farmer: farmerId, _id: queryId })

    if (!query) throw new ApiError(404, "Query not found")

    if (query.status !== 'open') throw new ApiError(400, "Query cannot be updated after admin action")

    if (query.adminReply) {
        throw new ApiError(400, "Query cannot be updated after admin reply")
    }


    if (subject !== undefined) {
        query.subject = subject
    }

    if (message !== undefined) {
        query.message = message
    }

    await query.save()

    return query
}

export const closeQueryService = async ({ farmerId, queryId }) => {
    const query = await Query.findOne({
        _id: queryId,
        farmer: farmerId
    })

    if (!query) {
        throw new ApiError(404, "Query not found")
    }

    if (query.status === "closed") {
        throw new ApiError(400, "Query already closed")
    }

    query.status = "closed"
    await query.save()

    return query
}
