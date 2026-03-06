import { ApiError } from '../utils/apiError.js'
import { Product } from '../models/product.model.js'
import { FarmLand } from '../models/farmLand.model.js'
import { uploadToCloudinary, deleteUploadedFile } from '../utils/upload.cloudinary.js'
import { Location } from '../models/location.model.js'


export const createProductListing = async ({ farmerId, payload, files }) => {
    const farmland = await FarmLand.findOne({
        owner: farmerId,
        _id: payload.farmlandId,
        isActive: true
    }).select("_id")

    if (!farmland) throw new ApiError(403, "Invalid or inactive farmland")

    let images;

    if (files?.length) {

        const uploads = await Promise.all(
            files.map(file => uploadToCloudinary(file.path))
        )

        images = uploads.map(img => ({
            url: img.url,
            publicId: img.publicId
        }))
    }


    const listing = await Product.create({
        farmer: farmerId,
        farmland: farmland._id,
        ...payload,
        isActive: true,
        moderation: "pending",
        images
    })

    return listing
}

export const myProductListings = async ({ farmerId, query }) => {

    const { page = 1, limit = 10, moderation, isActive, search } = query

    const filter = { farmer: farmerId }

    if (moderation) {
        filter.moderation = moderation
    }

    if (isActive !== undefined) {
        filter.isActive = isActive === "true"
    }

    if (search !== undefined) {
        filter.title = { $regex: search, $options: "i" }
    }

    const skip = (Number(page - 1)) * limit

    const [products, total] = await Promise.all([
        Product.find(filter).populate({
            path: "farmland",
            select: "location name size",
            populate: {
                path: "location",
                select: "state locality district"
            }
        }).sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit)),

        Product.countDocuments(filter)
    ])

    return {
        products,
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit)
        }
    }
}

export const getProductByIdService = async ({ listingId }) => {
    const product = await Product.findById(listingId).populate({
        path: "farmland",
        select: "name size location",
        populate: {
            path: "location",
            select: "locality district state"
        }
    })

    if (!product) throw new ApiError(404, "Product not found")

    return product
}

export const updateStockService = async ({ listingId, farmerId, stock }) => {
    const product = await Product.findOne({ _id: listingId, farmer: farmerId })

    if (!product) throw new ApiError(404, "Product not found")

    if (product.moderation === "rejected") {
        throw new ApiError(403, "You are not allowed to update listing as it is rejected!")
    }

    product.stock = stock
    product.moderation = "pending"
    await product.save({ new: true })

    return product
}

export const updatePriceService = async ({ listingId, farmerId, price }) => {

    const product = await Product.findOne({ _id: listingId, farmer: farmerId })

    if (!product) throw new ApiError(404, "Product not found")

    if (product.moderation === "rejected") {
        throw new ApiError(403, "You are not allowed to update listing as it is rejected!")
    }

    product.price = price
    product.moderation = "pending"
    await product.save({ new: true })

    return product
}

export const updateProductListing = async ({ farmerId, listingId, payload, files = null }) => {

    const product = await Product.findOne({ _id: listingId, farmer: farmerId })

    if (!product) throw new ApiError(403, "You are not allowed to update listing")
    if (product.moderation === "rejected") {
        throw new ApiError(403, "You are not allowed to update listing as it is rejected!")
    }

    const allowedFields = [
        "title",
        "description",
        "price",
        "stock",
        "category",
        "isActive"
    ]

    for (let field of allowedFields) {
        if (payload[field] !== undefined) {
            product[field] = payload[field]
        }
    }

    //Image updation later

    const criticalFields = ["price", "category", "title", "stock"]

    if (criticalFields.some(f => payload[f] !== undefined)) {
        product.moderation = "pending"
    }
    await product.save()

    return product


}

export const deactivateProductListing = async ({ farmerId, listingId }) => {
    const product = await Product.findOne({ farmer: farmerId, _id: listingId })

    if (!product) throw new ApiError(403, "You are not allowed to update listing")

    product.isActive = !product.isActive
    await product.save()

    return product

}

export const getProductListingService = async (query) => {
    const { page = 1, limit = 10, state, district, qualityGrade, minPrice, maxPrice, category, sort, search } = query

    const filter = {
        moderation: "approved",
        isActive: true
    }

    if (state || district) {
        const locationQuery = {}
        if (state) locationQuery.state = state
        if (district) locationQuery.district = district

        const location = await Location.find(locationQuery).select("_id")

        if (!location || location.length < 1) {
            return {
                listings: [],
                pagination: {
                    total: 0,
                    page: Number(page),
                    limit: Number(limit),
                    totalPage: 0
                }
            }
        }

        const farmlands = await FarmLand.find({
            location: { $in: location.map(l => l._id) },
            isActive: true
        }).select("_id")

        if (!farmlands.length) {
            return {
                listings: [],
                pagination: {
                    total: 0,
                    page: Number(page),
                    limit: Number(limit),
                    totalPage: 0
                }
            }
        }

        filter.farmland = { $in: farmlands.map(f => f._id) }

    }

    if (category) {
        filter.category = category
    }

    if (qualityGrade) {
        filter.qualityGrade = qualityGrade
    }

    if (search) {
        filter.title = { $regex: search, $options: "i" }
    }


    if (minPrice || maxPrice) {
        filter["price.value"] = {}

        if (minPrice) filter["price.value"].$gte = Number(minPrice)
        if (maxPrice) filter["price.value"].$lte = Number(maxPrice)
    }

    let sortOptions = { createdAt: -1 }

    if (sort === "price_asc") {
        sortOptions = { "price.value": 1 }
    }

    if (sort === "price_desc") {
        sortOptions = { "price.value": -1 }
    }

    const skip = (Number(page) - 1) * Number(limit)

    const pipeline = [
        {
            $match: filter
        },
        {
            $lookup: {
                from: "farmers",
                localField: "farmer",
                foreignField: "_id",
                as: "farmer"
            }
        },
        {
            $unwind: "$farmer"
        },
        {
            $match: {
                "farmer.isActive": true
            }
        },
        {
            $lookup: {
                from: "farmlands",
                localField: "farmland",
                foreignField: "_id",
                as: "farmland"
            }
        },
        {
            $unwind: "$farmland"
        },
        {
            $lookup: {
                from: "locations",
                localField: "farmland.location",
                foreignField: "_id",
                as: "location",
            }
        },
        {
            $unwind: "$farmland.location"
        }
    ]

    const [products, total] = await Promise.all([
        Product.find(filter).populate([
            {
                path: "farmland",
                select: "name size location",
                populate: {
                    path: "location",
                    select: "state district locality"
                }
            },
            {
                path: "farmer",
                match: { isActive: true },
                select: "fullname isActive"
            }
        ]).sort(sortOptions)
            .skip(skip)
            .limit(limit),

        Product.countDocuments(filter)
    ])

    const filteredProducts = products.filter(p => p.farmer)

    if (!filteredProducts || filteredProducts.length < 1) {
        return {
            listings: [],
            pagination: {
                total: 0,
                page: Number(page),
                limit: Number(limit),
                totalPage: 0
            }
        }
    }


    return {
        listings: filteredProducts,
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit)
        }
    }
}