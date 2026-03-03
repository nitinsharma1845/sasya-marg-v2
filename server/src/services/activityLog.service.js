import { ActivityLog } from "../models/activityLog.model.js"


export const logActivity = async ({
    userId,
    role,
    action,
    message,
    metadata = {},
    req
}) => {

    try {

        await ActivityLog.create({
            userId,
            role,
            action,
            message,
            metadata,
            ipAddress: req?.ip,
            userAgent: req.headers["user-agent"]
        })

    } catch (error) {
        console.error("Activity log failed:", error.message)
    }
}

export const getLogsService = async ({ query }) => {
    const {
        page = 1,
        limit = 20,
        role,
        action,
        search,
        startDate,
        endDate
    } = query

    const filter = {}
    if (role) filter.role = role
    if (action) filter.action = action

    if (startDate || endDate) {
        filter.createdAt = {}
        if (startDate) filter.createdAt.$gte = new Date(startDate)
        if (endDate) filter.createdAt.$lte = new Date(endDate)
    }

    if (search) {
        filter.$or = [
            { message: { $regex: search, $options: "i" } },
            { action: { $regex: search, $options: "i" } },
        ]
    }

    const logs = await ActivityLog.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean()

    const total = await ActivityLog.countDocuments(filter)

    return {
        logs,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)

        }
    }

}