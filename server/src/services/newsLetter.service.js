import crypto from "crypto"
import { NewsletterSubscriber } from "../models/newsLetterSubscriber.model.js"
import { ApiError } from "../utils/apiError.js"
import { sendEmail } from "./email.service.js"
import { newsLatterTemplate } from "./templates.service.js"
import { logActivity } from "./activityLog.service.js"

export const generateToken = () => {
    return crypto.randomBytes(32).toString("hex")
}

export const subscribeToNewsLetterService = async ({ email, req }) => {
    const existing = await NewsletterSubscriber.findOne({ email })

    if (existing && existing?.isActive) {
        throw new ApiError(409, "You have alredy subscribed to our newsletters!")
    }

    const token = generateToken()

    const subscriber = await NewsletterSubscriber.findOneAndUpdate(
        { email },
        {
            email,
            isActive: true,
            unsubscribeToken: token,
            subscribedAt: new Date(),
            unsubscribedAt: null,

        },
        { upsert: true, new: true }
    )

    const html = newsLatterTemplate(
        {
            websiteUrl: process.env.CLIENT_URL,
            unSubscribeUrl: `${process.env.CLIENT_URL}/public/unsubscribe/${token}`
        })

    sendEmail({ to: email, subject: "Welcome to Sasyamarg", html })
        .catch(err => {
            console.error("Background Email Error:", err.message);
        });

    await logActivity({
        req,
        userId: null,
        role: "guest",
        isGuest: true,
        action: "NEWSLETTER_SUBSCRIBE",
        message: `Newsletter subscribed: ${email}`,
        metadata: {
            email,
            ip: req?.ip
        }
    })

    return subscriber
}

export const unsubscribeToNewsletterService = async ({ token, req }) => {
    const subscriber = await NewsletterSubscriber.findOne({ unsubscribeToken: token })

    if (!subscriber) throw new ApiError(404, "Invalid or expired unsubscribe link")

    if (subscriber.isActive === false) {
        throw new ApiError(409, "You are already unsubscribed")
    }

    subscriber.isActive = false
    subscriber.unsubscribedAt = new Date()
    subscriber.unsubscribeToken = null
    await subscriber.save()

    await logActivity({
        req,
        userId: null,
        role: "guest",
        isGuest: true,
        action: "NEWSLETTER_UNSUBSCRIBE",
        message: `Newsletter unsubscribed: ${subscriber.email}`,
        metadata: {
            email: subscriber.email
        }
    })
    return true
}

export const getSubscribers = async (query) => {
    const { page = 1, limit = 20, search, isActive } = query

    const filter = {}
    if (isActive) {
        filter.isActive = isActive
    }

    if (search) {
        filter.email = { $regex: search, $options: "i" }
    }

    const skip = (Number(page) - 1) * Number(limit)

    const [subscribers, total] = await Promise.all([
        NewsletterSubscriber.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
        NewsletterSubscriber.countDocuments(filter)
    ])

    return {
        subscribers,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    }
}