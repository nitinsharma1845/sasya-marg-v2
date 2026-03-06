import { Buyer } from "../models/buyer.model.js"

export const activeBuyer = async (req, res, next) => {
    try {

        if (req.user.role !== "buyer") {
            return next()
        }

        if (req.user.isActive === true) {
            return next()
        }

        const buyer = await Buyer.findById(req.user._id)
            .select("isBlocked blockedBy blockedAt blockReason")

        if (!buyer || buyer.isBlocked === true) {
            return res.status(403).json({
                code: "BUYER_BLOCKED",
                message: "Your account has been blocked",
                reason: buyer?.blockReason ?? null,
                blockedAt: buyer?.blockedAt ?? null,
                blockedBy: buyer?.blockedBy ?? null
            })
        }

        next()

    } catch (error) {
        next(error)
    }
}