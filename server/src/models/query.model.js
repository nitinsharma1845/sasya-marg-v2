import mongoose from 'mongoose'


const querySchema = new mongoose.Schema({

    fullname: {
        type: String,
        required: true,
        trim: true
    },

    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Farmer",
        required: true
    },

    email: {
        type: String,
        lowercase: true,
        trim: true,
    },

    phone: {
        type: String,
        required: true,
        index: true
    },

    inquiry: {
        type: String,
        enum: [
            "crop",
            "product",
            "weather",
            "pricing",
            "technical",
            "account",
            "other"
        ],
        required: true,
        index: true
    },

    subject: {
        type: String,
        required: true,
        trim: true
    },

    message: {
        type: String,
        required: true,
        trim: true
    },

    adminReply: {
        type: String,
        trim: true
    },

    repliedAt: {
        type: Date,
    },

    repliedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    },

    status: {
        type: String,
        enum: [
            "open",
            "in_progress",
            "resolved",
            "closed"
        ],
        default: "open",
        index: true
    },

    priority: {
        type: String,
        enum: [
            "low",
            "medium",
            "high",
            "urgent"
        ],
        default: "medium",
        index: true
    }

}, { timestamps: true })



export const Query = mongoose.model("Query", querySchema)