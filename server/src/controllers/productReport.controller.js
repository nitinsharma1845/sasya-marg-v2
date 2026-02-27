import { createReport, getBuyerReports } from "../services/productReport.service.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from '../utils/apiResponse.js'

export const createProductReport = asyncHandler(async (req, res) => {
    const buyerId = req.user._id
    const payload = req.body
    const files = req.files || []

    const report = await createReport({ buyerId, payload, files })

    req.activityLog = {
        userId: req.user._id,
        role: "buyer",
        action: "REPORT_POSTED",
        message: "A new report is done by buyer",
        metadata: {
            buyerId: req.user._id,
            reportId: report._id,
        }
    }

    return res.status(201).json(new ApiResponse(201, report, "Report sent to admin for review and required action"))
})

export const getProductReports = asyncHandler(async (req, res) => {
    const query = req.query
    const buyerId = req.user._id

    const { reports, pagination } = await getBuyerReports({ buyerId, query })

    return res.status(200).json(new ApiResponse(200, { reports, pagination }, "Reportes fetched successfully"))
})
