import mongoose from "mongoose"

const contactSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
            trim: true
        },
        lastname: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        phone: {
            type: String
        },
        role: {
            type: String,
            enum: ["buyer", "farmer", "guest"],
            default: "guest"
        },
        message: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: ["pending", "in-progress", "resolved"],
            default: "pending"
        },

        adminReply: {
            type: String,
        },

        replyAt: {
            type: Date,
        },

        isRead: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
)

export const Contact = mongoose.model("Contact", contactSchema)