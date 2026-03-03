import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from '../utils/apiResponse.js'
import { createQueryService } from "../services/publicQuery.service.js"

export const createPublicQuery = asyncHandler(async (req, res) => {
    const { firstname, email, lastname, phone, message, role } = req.body;
    const query = await createQueryService({ firstname, email, lastname, phone, message, role, req })

    return res.status(201).json(new ApiResponse(201, query, "Query send successfully"))
})