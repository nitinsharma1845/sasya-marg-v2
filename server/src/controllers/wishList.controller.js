import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import {
  addToWishList,
  removeFromWishList,
  myWishList
} from "../services/wishList.service.js";

export const addWishlistItem = asyncHandler(async (req, res) => {
  const buyerId = req.user._id;
  const { itemId, itemType } = req.body;

  const item = await addToWishList({ itemId, buyerId, itemType });

  req.activityLog = {
    userId: buyerId,
    role: "buyer",
    action: "WISHLIST_ADD",
    message: "Product added to wishlist",
    metadata: {
      productId: item._id,
    }
  }

  return res
    .status(201)
    .json(new ApiResponse(201, item, "Item added to wishlist"));
});

export const removeWishlistItem = asyncHandler(async (req, res) => {
  const buyerId = req.user._id;
  const { listingId } = req.params;

  await removeFromWishList({ listingId, buyerId });

  req.activityLog = {
    userId: buyerId,
    role: "buyer",
    action: "WISHLIST_REMOVE",
    message: "Product removed from wishlist",
    metadata: {
      productId: listingId
    }
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Item removed from wishlist"));
});

export const getMyWishlist = asyncHandler(async (req, res) => {
  const buyerId = req.user._id;

  const result = await myWishList({
    buyerId,
    query: req.query
  });

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Wishlist fetched successfully"));
});
