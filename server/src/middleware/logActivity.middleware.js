import { logActivity } from "../services/activityLog.service.js"
export const activityLogger = (req, res, next) => {
    res.on("finish", () => {
        if (!req.activityLog) {
            return;
        }

        const { userId, role, action, message, metadata } = req.activityLog

        logActivity({ userId, role, action, message, metadata, req })
    })

    next()
}