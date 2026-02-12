import { Farmer } from "../models/farmer.model.js"
import { Admin } from "../models/admin.model.js"
import { Buyer } from "../models/buyer.model.js"


export const currentUserService = async ({ req }) => {
    if (req.user.role === 'farmer') {
        const farmer = await Farmer.findById(req.user._id)
        return {


            _id: farmer._id,
            fullname: farmer.fullname,
            email: farmer.email,
            phone: farmer.phone,
            role: req.user.role,
            isActive: farmer.isActive

        }
    }

    if (req.user.role === 'admin' || req.user.role === 'super_admin') {
        const admin = await Admin.findById(req.user._id)
        return {
            _id: admin._id,
            fullname: admin.fullname,
            email: admin.email,
            phone: admin.phone,
            role: req.user.role,
            lastLogin : admin.lastLogin,
            isActive : admin.isActive
        }
    }

    if (req.user.role === 'buyer') {
        const buyer = await Buyer.findById(req.user._id)
        return {


            _id: buyer._id,
            fullname: buyer.fullname,
            email: buyer.email,
            phone: buyer.phone,
            role: req.user.role,

        }
    }
}