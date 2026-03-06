import { z } from "zod"
import mongoose from "mongoose"

const objectId = z.string().refine(
    val => mongoose.Types.ObjectId.isValid(val),
    { message: "Invalid ID format" }
)

const categoryEnum = z.enum(
    ["vegetable", "fruit", "grain", "pulse", "oilseed", "spice", "other"],
    { errorMap: () => ({ message: "Invalid category value" }) }
)

const priceUnitEnum = z.enum(
    ["per_kg", "per_quintal", "per_ton"],
    { errorMap: () => ({ message: "Invalid price unit" }) }
)

const stockUnitEnum = z.enum(
    ["kg", "quintal", "ton"],
    { errorMap: () => ({ message: "Invalid stock unit" }) }
)

const moderationEnum = z.enum(
    ["pending", "approved", "rejected"],
    { errorMap: () => ({ message: "Invalid moderation status" }) }
)

export const createProductSchema = z.object({
    body: z.object({
        title: z
            .string()
            .trim()
            .min(3, "Title must contain at least 3 characters")
            .max(100, "Title cannot exceed 100 characters"),

        description: z
            .string()
            .trim()
            .min(10, "Description must contain at least 10 characters"),

        farmlandId: objectId,

        category: categoryEnum,

        price: z.object({
            value: z.coerce
                .number()
                .positive("Price must be greater than 0"),
            unit: priceUnitEnum
        }),

        stock: z.object({
            value: z.coerce
                .number()
                .positive("Stock must be greater than 0"),
            unit: stockUnitEnum
        })
    })
})

export const updateProductSchema = z.object({
    params: z.object({
        listingId: objectId
    }),

    body: z.object({
        title: z
            .string()
            .trim()
            .min(3, "Title must contain at least 3 characters")
            .max(100, "Title cannot exceed 100 characters")
            .optional(),

        description: z
            .string()
            .trim()
            .min(10, "Description must contain at least 10 characters")
            .optional(),

        category: categoryEnum.optional(),

        price: z.object({
            value: z
                .number()
                .positive("Price must be greater than 0"),
            unit: priceUnitEnum
        }).optional(),

        stock: z.object({
            value: z
                .number()
                .positive("Stock must be greater than 0"),
            unit: stockUnitEnum
        }).optional(),

        isActive: z.boolean().optional()
    }).strict()
})

export const myProductListingQuerySchema = z.object({
    query: z.object({
        page: z.coerce.number().int().positive("Page must be greater than 0").optional(),

        limit: z.coerce
            .number()
            .int()
            .positive("Limit must be greater than 0")
            .max(50, "Limit cannot exceed 50")
            .optional(),

        isActive: z.enum(["true", "false"]).optional(),

        moderation: moderationEnum.optional()
    })
})

export const getProductByIdSchema = z.object({
    params: z.object({
        listingId: objectId
    })
})

export const toggleProductSchema = z.object({
    params: z.object({
        listingId: objectId
    })
})

export const updateStockSchema = z.object({
    params: z.object({
        listingId: objectId
    }),

    body: z.object({
        stock: z.object({
            value: z.number().positive("Stock must be greater than 0"),
            unit: stockUnitEnum
        })
    })
})

export const updatePriceSchema = z.object({
    params: z.object({
        listingId: objectId
    }),

    body: z.object({
        price: z.object({
            value: z.number().positive("Price must be greater than 0"),
            unit: priceUnitEnum
        })
    })
})

const lowercaseOptionalString = z.preprocess(
    v => typeof v === "string" ? v.trim().toLowerCase() : undefined,
    z.string().min(2, "Value must contain at least 2 characters").optional()
)

export const getProductListingSchema = z.object({
    query: z.object({
        page: z.coerce.number().int().positive("Page must be greater than 0").optional(),

        limit: z.coerce
            .number()
            .int()
            .positive("Limit must be greater than 0")
            .max(50, "Limit cannot exceed 50")
            .optional(),

        state: lowercaseOptionalString,

        district: lowercaseOptionalString,

        qualityGrade: z.enum(["A", "B", "C", "organic"]).optional(),

        category: categoryEnum.optional(),

        minPrice: z.coerce
            .number()
            .positive("Minimum price must be greater than 0")
            .optional(),

        maxPrice: z.coerce
            .number()
            .positive("Maximum price must be greater than 0")
            .optional(),

        search: z.string().trim().optional(),

        sort: z.enum(["price_asc", "price_desc", "newest"]).optional()
    })
})