import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/apiResponse.js"

import {
    createProductListing,
    myProductListings,
    updateProductListing,
    deactivateProductListing,
    getProductByIdService,
    updatePriceService,
    updateStockService
} from "../services/product.service.js"

export const createProduct = asyncHandler(async (req, res) => {
    const farmerId = req.user._id
    const payload = req.body
    const files = req.files || []

    const product = await createProductListing({
        farmerId,
        payload,
        files
    })

    return res
        .status(201)
        .json(new ApiResponse(201, product, "Product created successfully"))
})

export const getMyProducts = asyncHandler(async (req, res) => {
    const farmerId = req.user._id
    const query = req.query

    const result = await myProductListings({
        farmerId,
        query
    })

    return res
        .status(200)
        .json(new ApiResponse(200, result, "Products fetched successfully"))
})

export const getProductById = asyncHandler(async (req, res) => {
    const { listingId } = req.params

    const result = await getProductByIdService({
        listingId
    })

    return res
        .status(200)
        .json(new ApiResponse(200, result, "Products fetched successfully"))
})

export const updatePrice = asyncHandler(async (req, res) => {
    const farmerId = req.user._id
    const { listingId } = req.params
    const { price } = req.body

    const product = await updatePriceService({ farmerId, listingId, price })

    return res
        .status(200)
        .json(new ApiResponse(200, product, "Products Price changed successfully"))

})


export const updateStock = asyncHandler(async (req, res) => {
    const farmerId = req.user._id
    const { listingId } = req.params
    const { stock } = req.body

    const product = await updateStockService({ farmerId, listingId, stock })

    return res
        .status(200)
        .json(new ApiResponse(200, product, "Products Price changed successfully"))
})



export const updateProduct = asyncHandler(async (req, res) => {
    const farmerId = req.user._id
    const { listingId } = req.params
    const payload = req.body
    const files = req.files || null

    const product = await updateProductListing({
        farmerId,
        listingId,
        payload,
        files
    })

    return res
        .status(200)
        .json(new ApiResponse(200, product, "Product updated successfully"))
})

export const toggleProductStatus = asyncHandler(async (req, res) => {
    const farmerId = req.user._id
    const { listingId } = req.params

    const product = await deactivateProductListing({
        farmerId,
        listingId
    })

    return res
        .status(200)
        .json(new ApiResponse(200, product, "Product status updated successfully"))
})
