import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { getSubscribers, subscribeToNewsLetterService, unsubscribeToNewsletterService } from "../services/newsLetter.service.js";

export const subscribeToNewsLetter = asyncHandler(async (req, res) => {
    const { email } = req.body

    const subscriber = await subscribeToNewsLetterService({ email, req })

    return res.status(201).json(new ApiResponse(201, subscriber, "Successfully Subscribed to newsletter."))

})

export const unSubscribeToNewsletter = asyncHandler(async (req, res) => {
    const { token } = req.params

    await unsubscribeToNewsletterService({ token, req })

    return res.status(200).json(new ApiResponse(200, null, "You have successfully unsubscribed to Sasyamarg newsletter"))
})

export const getAllSubscribers = asyncHandler(async (req, res) => {
    const query = req.query
    const { subscribers, pagination } = await getSubscribers(query)
    return res.status(200).json(new ApiResponse(200, { subscribers, pagination }, "Fetch all subscribers"))
})