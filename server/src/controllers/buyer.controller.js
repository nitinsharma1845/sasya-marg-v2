import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/apiResponse.js'
import { loginBuyerUsingOtpService, loginBuyerUsingPasswordService, registerBuyerService, forgotBuyerPasswordService, changeBuyerPasswordService, currentUserService, updateBuyerAddressService, buyerDashboardSevice, getSingleProductService, changeBuyerProfileService } from '../services/buyer.service.js'
import { getPreHarvestListingService, getSinglePreHarvestProductForBuyer } from '../services/preHarvestListing.service.js'
import { getProductListingService } from '../services/product.service.js'



export const registerBuyer = asyncHandler(async (req, res) => {
    const { fullname, phone, otp, password, email } = req.body

    const { buyer, token } = await registerBuyerService({ fullname, phone, otp, password, email })

    res
        .cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 100 * 60 * 60 * 24 * 7 })
        .status(201)
        .json(new ApiResponse(201, buyer, "Buyer registered successfully"))
})

export const loginBuyerWithPassword = asyncHandler(async (req, res) => {
    const { password, identifier } = req.body

    const { buyer, token } = await loginBuyerUsingPasswordService({ password, identifier })

    res
        .cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 100 * 60 * 60 * 24 * 7 })
        .status(200)
        .json(new ApiResponse(200, buyer, "Buyer loggedin successfully"))

})

export const loginBuyerWithOtp = asyncHandler(async (req, res) => {
    const { otp, phone } = req.body

    const { token, buyer } = await loginBuyerUsingOtpService({ otp, phone })

    res
        .cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 100 * 60 * 60 * 24 * 7 })
        .status(200)
        .json(new ApiResponse(200, buyer, "Buyer loggedin successfully"))
})

export const forgotPassword = asyncHandler(async (req, res) => {
    const { otp, phone, newPassword } = req.body

    const { buyer } = await forgotBuyerPasswordService({ otp, phone, newPassword })

    return res.status(200).json(new ApiResponse(200, buyer, "Password changed successfully"))
})

export const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body
    const buyerId = req.user._id


    const buyer = await changeBuyerPasswordService({ oldPassword, newPassword, _id: buyerId })

    return res.status(200).json(new ApiResponse(200, buyer, "Password Changed Successfully"))
})

export const currentUser = asyncHandler(async (req, res) => {
    const buyerId = req.user._id

    const buyer = await currentUserService({ buyerId })

    return res.status(200).json(new ApiResponse(200, buyer, "User Fetched successfully"))
})

export const updateBuyerAddress = asyncHandler(async (req, res) => {

    const address = req.body.address
    const buyerId = req.user._id

    const buyer = await updateBuyerAddressService({ buyerId, address })

    return res.status(200).json(new ApiResponse(200, buyer, "Address updated"))
})

export const updateBuyerProfile = asyncHandler(async (req, res) => {
    const buyerId = req.user._id
    const { fullname, email } = req.body

    const buyer = await changeBuyerProfileService({ buyerId, fullname, email })

    return res.status(201).json(new ApiResponse(201, buyer, "Profile updated Successfully"))
})

export const logoutBuyer = asyncHandler(async (req, res) => {
    return res
        .clearCookie("token",
            {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production"
            }
        )
        .status(200)
        .json(new ApiResponse(200, null, "Logout Successfull"))
})

export const getPreHarvestedListings = asyncHandler(async (req, res) => {

    const { listings, pagination } = await getPreHarvestListingService(req.query)

    return res.status(200).json(new ApiResponse(200, { listings, pagination }, "Listing Feteched Successfully"))
})

export const getProductListings = asyncHandler(async (req, res) => {

    const { listings, pagination } = await getProductListingService(req.query)

    return res.status(200).json(new ApiResponse(200, { listings, pagination }, "Listing Feteched Successfully"))
})

export const getSingleProductListings = asyncHandler(async (req, res) => {

    const { listingId } = req.params
    const buyerId = req.user._id

    const product = await getSingleProductService({ listingId, buyerId })

    return res.status(200).json(new ApiResponse(200, product, "Listing Feteched Successfully"))
})

export const getSinglePreHarvestProductListing = asyncHandler(async (req, res) => {

    const { listingId } = req.params
    const buyerId = req.user._id

    const product = await getSinglePreHarvestProductForBuyer(listingId, buyerId)

    return res.status(200).json(new ApiResponse(200, product, "Listing Feteched Successfully"))
})

export const buyerDashbord = asyncHandler(async (req, res) => {
    const buyerId = req.user._id

    const dashboard = await buyerDashboardSevice(buyerId)

    return res
        .status(200)
        .json(new ApiResponse(200, dashboard, "Buyer dashboard fetched"));
})