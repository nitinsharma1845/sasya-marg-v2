import { ProductReport } from "../models/productReport.model.js"
import { ApiError } from "../utils/apiError.js"
import { uploadToCloudinary } from "../utils/upload.cloudinary.js"


export const createReport = async ({ buyerId, payload, files }) => {

    let images = []

    if (files?.length) {
        if (files.length > 5) throw new ApiError(401, "Maximum 5 evidence files allowed")
        for (const file of files) {
            const { url, publicId } = await uploadToCloudinary(file.path)
            images.push({ url, publicId })
        }
    }

    const report = await ProductReport.create({
        ...payload,
        buyer: buyerId,
        evidence: images,
        status: "pending"
    })

    return report
}

export const getBuyerReports = async ({ buyerId = null, query }) => {

    const { page = 1, limit = 5, reason, status } = query
    const filter = {}

    if (buyerId) {
        filter.buyer = buyerId
    }

    if (reason) filter.reason = reason

    if (status) filter.status = status


    const skip = (Number(page - 1)) * Number(limit)

    const [reports, total] = await Promise.all([

        ProductReport.find(filter).populate({
            path: "buyer",
            select: "fullname phone email "
        })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit)),

        ProductReport.countDocuments(filter)

    ])

    if (!reports || reports.length === 0) {
        return {
            reports: [],
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total / limit)
            }
        }
    }

    return {
        reports,
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit)
        }
    }
}