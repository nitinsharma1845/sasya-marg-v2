import mongoose from "mongoose"

const activityLogSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            refPath: "role",
        },
        role: {
            type: String,
            enum: ["farmer", "buyer", "admin", "superadmin", "guest"],
            required: false,
        },

        isGuest: {
            type: Boolean,
            default: false
        },

        action: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        metadata: {
            type: Object,
        },
        ipAddress: String,
        userAgent: String,
    },
    { timestamps: true }
)

activityLogSchema.index({ userId: 1 })
activityLogSchema.index({ role: 1 })
activityLogSchema.index({ createdAt: -1 })

export const ActivityLog = mongoose.model("ActivityLog", activityLogSchema)