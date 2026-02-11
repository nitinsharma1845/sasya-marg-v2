import { WishList } from "../models/wishList.model.js";
import { ApiError } from "../utils/apiError.js";
import { Product } from "../models/product.model.js";
import { PreHarvestListing } from "../models/preHarvetedListing.model.js";



export const addToWishList = async ({ itemId, buyerId, itemType }) => {
    let itemExists;

    if (itemType === "harvested") {
        itemExists = await Product.findOne({
            _id: itemId,
            moderation: "approved",
            isActive: true
        });
    } else if (itemType === "pre_harvested") {
        itemExists = await PreHarvestListing.findOne({
            _id: itemId,
            moderation: "approved",
            status: "open"
        });
    } else {
        throw new ApiError(400, "Invalid item type");
    }

    if (!itemExists) {
        throw new ApiError(404, "Item not available");
    }

    try {
        return await WishList.create({
            buyer: buyerId,
            item: itemId,
            itemType
        });
    } catch (error) {
        if (error.code === 11000) {
            throw new ApiError(409, "Item already in wishlist");
        }
        throw error;
    }
};

export const removeFromWishList = async ({ listingId, buyerId }) => {
    const item = await WishList.findOneAndDelete({
        item: listingId,
        buyer: buyerId
    });

    if (!item) throw new ApiError(404, "Wishlist item not found");

    return true;
};

export const myWishList = async ({ buyerId, query = {} }) => {
    const { page = 1, limit = 10, itemType, search } = query;

    const filter = { buyer: buyerId };
    if (itemType) filter.itemType = itemType;

    if (search) {
        filter.title = { $regex: search, $options: "i" }
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [items, total] = await Promise.all([
        WishList.find(filter)
            .populate("item")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit)),

        WishList.countDocuments(filter)
    ]);

    const validItems = items.filter(i => i.item !== null);

    return {
        listings: validItems,
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit)
        }
    };
};
