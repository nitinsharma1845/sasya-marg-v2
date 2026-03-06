import { Farmer } from "../models/farmer.model.js"
import { Admin } from "../models/admin.model.js"
import { Buyer } from "../models/buyer.model.js"
import { ApiError } from "../utils/apiError.js"

export const currentUserService = async ({ req }) => {

    if (req.user.role === "farmer") {
        const farmer = await Farmer.findById(req.user._id)
            .select("_id fullname email phone isActive")
            .lean()

        if (!farmer) throw new ApiError(404, "User not found")

        return {
            ...farmer,
            role: req.user.role
        }
    }

    if (req.user.role === "admin" || req.user.role === "super_admin") {
        const admin = await Admin.findById(req.user._id)
            .select("_id fullname email phone lastLogin isActive")
            .lean()

        if (!admin) throw new ApiError(404, "User not found")

        return {
            ...admin,
            role: req.user.role
        }
    }

    if (req.user.role === "buyer") {
        const buyer = await Buyer.findById(req.user._id)
            .select("_id fullname email phone isBlocked")
            .lean()

        if (!buyer) throw new ApiError(404, "User not found")

        return {
            _id: buyer._id,
            fullname: buyer.fullname,
            email: buyer.email,
            phone: buyer.phone,
            role: req.user.role,
            isActive: !buyer.isBlocked
        }
    }
}