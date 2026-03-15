import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/apiResponse.js'
import { changeEmailService, changeFarmerDataService, changePasswordService, currentUserService, farmerDashboardService, forgotPasswordService, loginFarmerUsingOtpService, loginFarmerUsingPasswordService, registerFarmerService, toggleContactInfoService } from '../services/farmer.service.js'



export const register = asyncHandler(async (req, res) => {
    const { fullname, password, phone, otp } = req.body

    const { farmer, token } = await registerFarmerService({ fullname, password, phone, otp })

    req.activityLog = {
        userId: farmer._id,
        role: "farmer",
        action: "ACCOUNT_CREATED",
        message: "Account created for farmer role.",
        metadata: {
            id: farmer._id,
            phone: farmer.phone,
            fullname: farmer.fullname
        }
    }

    res
        .cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", maxAge: 100 * 60 * 60 * 24 * 7 })
        .status(200)
        .json(new ApiResponse(201, farmer, "Farmer registered successfully"))
})


export const loginFarmerUsingOtp = asyncHandler(async (req, res) => {
    const { phone, otp } = req.body

    const { farmer, token } = await loginFarmerUsingOtpService({ phone, otp })

    req.activityLog = {
        userId: farmer._id,
        role: "farmer",
        action: "LOGIN",
        message: "Login done for farmer role.",
        metadata: {
            method: "OTP",
            id: farmer._id,
            fullname: farmer.fullname,
            phone: farmer.phone
        }
    }

    res
        .cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", maxAge: 100 * 60 * 60 * 24 * 7 })
        .status(200)
        .json(new ApiResponse(200, farmer, "Login successfully"))


})

export const loginFarmerUsingPassword = asyncHandler(async (req, res) => {
    const { phone, password } = req.body

    const { farmer, token } = await loginFarmerUsingPasswordService({ phone, password })

    req.activityLog = {
        userId: farmer._id,
        role: "farmer",
        action: "LOGIN",
        message: "Login done for farmer role.",
        metadata: {
            method: "PASSWORD",
            id: farmer._id,
            fullname: farmer.fullname,
            phone: farmer.phone
        }
    }

    res
        .cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", maxAge: 100 * 60 * 60 * 24 * 7 })
        .status(200)
        .json(new ApiResponse(201, farmer, "Login successfully"))


})

export const forgotPassword = asyncHandler(async (req, res) => {
    const { otp, phone, newPassword } = req.body

    const { farmer } = await forgotPasswordService({ otp, phone, newPassword })

    req.activityLog = {
        userId: farmer._id,
        role: "farmer",
        action: "FORGOT_PASSWORD",
        message: "Forgot password request from farmer role.",
        metadata: {
            id: farmer._id,
            fullname: farmer.fullname,
            phone: farmer.phone
        }
    }

    return res.status(200).json(new ApiResponse(200, farmer, "Password changed successfully"))
})

export const logoutFarmer = asyncHandler(async (req, res) => {

    req.activityLog = {
        userId: req.user._id,
        role: "farmer",
        action: "LOGOUT",
        message: "Account logged out by farmer.",
        metadata: {
            id: req.user._id,
        }
    }

    return res
        .clearCookie("token",
            {
                httpOnly: true,
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                secure: process.env.NODE_ENV === "production"
            }
        )
        .status(200)
        .json(new ApiResponse(200, null, "Logout Successfull"))
})

export const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body
    const userId = req.user._id

    await changePasswordService({ oldPassword, newPassword, _id: userId })

    req.activityLog = {
        userId,
        role: "farmer",
        action: "RESET_PASSWORD",
        message: "password reset request from farmer role.",
        metadata: {
            id: userId,
        }
    }

    return res.status(200).json(new ApiResponse(200, null, "Password changes successfully"))
})

export const toggleIsContactVisible = asyncHandler(async (req, res) => {
    const userId = req.user._id
    const visibility = await toggleContactInfoService({ _id: userId })

    req.activityLog = {
        userId,
        role: "farmer",
        action: "CHANGE_CONTACT_VISIBILITY",
        message: "Contact visiblity change from farmer",
        metadata: {
            id: userId,
        }
    }

    return res.status(200).json(new ApiResponse(200, { contactVisibility: visibility }, "contact visibility changed successfully"))
})

export const changeFarmerData = asyncHandler(async (req, res) => {
    const _id = req.user._id
    const { fullname } = req.body
    const farmer = await changeFarmerDataService({ _id, fullname })

    req.activityLog = {
        userId: _id,
        role: "farmer",
        action: "UPDATE_PROFILE",
        message: "Profile updation request from farmer.",
        metadata: {
            id: farmer._id,
            phone: farmer.phone,
            fullname: farmer.fullname
        }
    }

    return res.status(200).json(new ApiResponse(200, farmer, "Data changed successfully"))
})

export const changeEmail = asyncHandler(async (req, res) => {
    const farmerId = req.user._id
    const { email, otp } = req.body

    const farmer = await changeEmailService({ email, otp, farmerId })

    req.activityLog = {
        userId: _id,
        role: "farmer",
        action: "UPDATE_PROFILE",
        message: "Profile updation request from farmer.",
        metadata: {
            id: farmer._id,
            email: farmer.email,
            fullname: farmer.fullname
        }
    }
    return res.status(200).json(new ApiResponse(200, farmer, "Email changed successfully"))
})

export const currentUser = asyncHandler(async (req, res) => {
    const { farmer } = await currentUserService({ req })

    return res.status(200).json(new ApiResponse(200, farmer, "user fetched!"))
})

export const farmerDashboard = asyncHandler(async (req, res) => {
    const farmerId = req.user._id

    const data = await farmerDashboardService(farmerId)

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                data,
                "Farmer snapshot fetched successfully"
            )
        )
})