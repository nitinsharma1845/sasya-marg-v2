import { ApiError } from "../utils/apiError.js"
import { Contact } from "../models/publicQuery.model.js"
import { sendEmail } from "./email.service.js"
import { contactUsAutoResponseTemplate, publicQueryReplyTemplate } from "./templates.service.js"
import { logActivity } from "./activityLog.service.js"


export const createQueryService = async ({ firstname, email, lastname, phone, message, role = "guest", req }) => {
    const query = await Contact.create({
        firstname,
        lastname,
        email,
        phone,
        role,
        message
    })
    const html = contactUsAutoResponseTemplate({ userName: `${firstname} ${lastname}`, websiteUrl: process.env.CLIENT_URL })

    await sendEmail({ to: email, subject: "We Received Your Message | SasyaMarg", html })
    await logActivity({ userId: null, role: "guest", action: "QUERY_RAISED", message: "A pubic query raised by guest user", metadata: { firstname, lastname, email, phone, message, role }, req })

    return query
}

export const getPublicQueries = async ({ query }) => {
    const { page = 1, limit = 10, search, status, role } = query
    const filter = {}

    if (status) filter.status = status
    if (role) filter.role = role

    if (search) {
        const searchRegex = new RegExp(search, "i")
        filter.$or = [{ firstname: searchRegex }, { lastname: searchRegex }, { email: searchRegex }, { phone: searchRegex }]
    }

    const skip = (Number(page) - 1) * Number(limit)

    const [queries, total] = await Promise.all([
        Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
        Contact.countDocuments(filter)
    ])

    return {
        queries,
        pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
        }
    }
}

export const replyToPublicQueryService = async ({ reply, queryId }) => {
    const query = await Contact.findById(queryId)

    if (!query) throw new ApiError(404, "No query found!")

    query.adminReply = reply
    query.replyAt = new Date()
    query.status = "resolved"
    query.isRead = true
    await query.save()

    const html = publicQueryReplyTemplate({ username: `${query.firstname} ${query.lastname}`, querySubject: "General Query", ticketId: query._id, websiteUrl: process.env.CLIENT_URL, adminMessage: reply })

    await sendEmail({ to: query.email, subject: "Email regarding the query raised by you.", html })

    return query
}