import { Farmer } from "../models/farmer.model.js"
import { Buyer } from "../models/buyer.model.js"
import EmailCampaign from "../models/emailCampaign.model.js"
import { sendEmail } from "./email.service.js"
import { campaignEmailTemplate } from "./templates.service.js"
import { NewsletterSubscriber } from "../models/newsLetterSubscriber.model.js"

const processEmails = async (campaignId, users, subject, message, title) => {


    for (let i = 0; i < users.length; i++) {

        try {
            const html = campaignEmailTemplate({ userName: users[i].fullname, title, message, subject, redirectUrl: process.env.CLIENT_URL, websiteUrl: process.env.CLIENT_URL })
            await sendEmail({ to: users[i].email, subject, html })

            await EmailCampaign.findByIdAndUpdate(
                campaignId,
                { $inc: { sentCount: 1 } }
            )

        } catch {
            await EmailCampaign.findByIdAndUpdate(
                campaignId,
                { $inc: { failedCount: 1 } }
            )
        }

        const campaign = await EmailCampaign.findById(campaignId)

        const progress = Math.floor(
            (campaign.sentCount + campaign.failedCount) /
            campaign.totalRecipients * 100
        )

        campaign.progress = progress

        if (progress === 100) {
            campaign.status = "completed"
        }

        await campaign.save()
    }
}

export const sendEmailCampaignService = async ({
    title,
    subject,
    message,
    adminId
}) => {

    const users = await NewsletterSubscriber.find({ isActive: true })

    const campaign = await EmailCampaign.create({
        title,
        subject,
        message,
        totalRecipients: users.length,
        sentCount: 0,
        failedCount: 0,
        progress: 0,
        status: "sending",
        createdBy: adminId
    })

    processEmails(campaign._id, users, subject, message, title)

    return campaign
}

export const getAllCampaignsService = async ({ query }) => {

    const { page = 1, limit = 10 } = query
    const skip = (Number(page) - 1) * Number(limit)
    const [campaign, total] = await Promise.all([
        EmailCampaign
            .find()
            .sort({ createdAt: -1 })
            .limit(Number(limit))
            .skip(skip)
            .lean(),

        EmailCampaign.countDocuments()
    ])

    return {
        campaign,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    }

}

export const getCampaignStatusService = async ({ campaignId }) => {
    const campaignDoc = await EmailCampaign.findById(campaignId)

    const campaign = {
        status: campaignDoc.status,
        progress: campaignDoc.progress,
        sent: campaignDoc.sentCount,
        failed: campaignDoc.failedCount,
        total: campaignDoc.totalRecipients
    }

    return campaign
}