import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            index: true
        },

        role: {
            type: String,
            enum: ["farmer", "buyer", "admin"],
            required: true
        },

        type: {
            type: String,
            enum: [
                "LISTING_APPROVED",
                "LISTING_REJECTED",
                "QUERY_REPLY",
                "REPORT_REPLY",
                "NEW_SCHEME",
                "WISHLIST_INTEREST",
                "ADMIN_MESSAGE"
            ],
            required: true
        },

        title: {
            type: String,
            required: true
        },

        message: {
            type: String,
            required: true
        },

        isRead: {
            type: Boolean,
            default: false,
            index: true
        },

        entityId: {
            type: mongoose.Schema.Types.ObjectId
        },

        entityType: {
            type: String,
            enum: ["harvest-listing", "pre-harvest-listing", "query", "report", "scheme", "wishlist"]
        },

        redirectUrl: {
            type: String
        },

        meta: {
            type: Object,
            default: {}
        },

        expiresAt: {
            type: Date,
            default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            index: { expires: 0 }
        }

    },
    {
        timestamps: true
    }
);


export default mongoose.model("Notification", notificationSchema);