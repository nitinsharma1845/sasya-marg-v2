import { z } from "zod";

export const addWishlistSchema = z.object({
    body: z.object({
        itemId: z.string().min(1, "Item id is required"),
        itemType: z.enum(["harvested", "pre_harvested"])
    })
});

export const removeWishlistSchema = z.object({
    params: z.object({
        listingId: z.string().min(1, "Wishlist id is required")
    })
});

export const getWishlistSchema = z.object({
    query: z.object({
        page: z.string().optional(),
        limit: z.string().optional(),
        itemType: z.enum(["harvested", "pre_harvested"]).optional()
    })
});
