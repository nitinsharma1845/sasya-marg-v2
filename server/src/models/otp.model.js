import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const otpSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        index: true
    },

    email: {
        type: String,
        index: true,
        lowercase: true,
        trim: true
    },

    purpose: {
        type: String,
        enum: ['login', 'register', 'forgot_password', "email_verification"],
        required: true
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expires: 0 }
    },
    isUsed: {
        type: Boolean,
        default: false
    },

    isBlocked: {
        type: Boolean,
        default: false
    },

    attempts: {
        type: Number,
        default: 0,

    },
    maxAttempts: {
        type: Number,
        default: 5,

    }
}, { timestamps: true })

otpSchema.pre('save', async function (next) {
    if (!this.isModified("otp")) return next;

    this.otp = await bcrypt.hash(this.otp, 10)
})

export const Otp = mongoose.model("Otp", otpSchema)