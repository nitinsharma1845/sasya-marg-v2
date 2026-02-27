import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { getLogsService } from "../services/activityLog.service.js";

export const getLogs = asyncHandler(async (req, res) => {
    const query = req.query
    const { logs, pagination } = await getLogsService({ query })

    return res.status(200).json(new ApiResponse(200, { logs, pagination }, "All logs fetched successfully"))
})