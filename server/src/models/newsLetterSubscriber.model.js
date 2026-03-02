import mongoose from "mongoose"

const newsletterSubscriberSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true
        },

        isActive: {
            type: Boolean,
            default: false
        },

        unsubscribeToken: {
            type: String,
            default: null
        },

        source: {
            type: String,
            enum: ["footer", "landing", "popup", "admin"],
            default: "footer"
        },

        subscribedAt: {
            type: Date,
            default: Date.now
        },

        unsubscribedAt: {
            type: Date,
            default: null
        },

        lastEmailSentAt: {
            type: Date,
            default: null
        },

        metadata: {
            ip: String,
            userAgent: String
        }
    },
    { timestamps: true }
)


export const NewsletterSubscriber = mongoose.model(
    "NewsletterSubscriber",
    newsletterSubscriberSchema
)