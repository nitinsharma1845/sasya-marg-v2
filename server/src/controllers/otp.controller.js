import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/apiResponse.js'
import { ApiError } from "../utils/apiError.js"
import { sendOtpService } from '../services/otp.service.js'

export const sendOtp = asyncHandler(async (req, res) => {
    const { purpose } = req.query
    const { phone, email } = req.body

    await sendOtpService({ phone, email, purpose })

    return res.status(201).json(new ApiResponse(200, null, "Otp sent successfully"))

})
