import { ActivityLog } from "../models/ActivityLog.model.js"


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