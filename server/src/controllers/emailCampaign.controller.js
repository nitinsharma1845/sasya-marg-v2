import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { getAllCampaignsService, getCampaignStatusService, sendEmailCampaignService } from "../services/emailCampaign.service.js";

export const sendEmailCampaign = asyncHandler(async (req, res) => {

    const { role, title, subject, message } = req.body

    const campaign = await sendEmailCampaignService({
        role,
        title,
        subject,
        message,
        adminId: req.user._id
    })

    res.status(201).json(new ApiResponse(201, campaign, "Campaign sent successfully"))

})

export const getCampaigns = asyncHandler(async (req, res) => {

    const { campaign, pagination } = await getAllCampaignsService({ query: req.query })

    res.status(200).json(new ApiResponse(200, { campaign, pagination }, "Campaign fetch successfully."))

})

export const getCampaignStatus = asyncHandler(async (req, res) => {
    const { campaignId } = req.params

    const campaign = await getCampaignStatusService({ campaignId })

    return res.status(200).json(new ApiResponse(200, campaign, "Status fetched successfully"))
})