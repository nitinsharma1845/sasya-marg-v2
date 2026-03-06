import { z } from "zod"

export const QUANTITY_UNITS = ["kg", "quintal", "ton"]
export const PRICE_UNITS = ["per_kg", "per_quintal", "per_ton"]
export const QUALITY_GRADES = ["A", "B", "C", "organic"]
export const LISTING_STATUS = ["open", "booked", "harvested", "cancelled"]
export const MODERATION_STATUS = ["pending", "approved", "rejected"]
export const CATEGORY = ["vegetable", "fruit", "grain", "pulse", "oilseed", "spice", "other"]

const objectId = z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format")

const quantitySchema = z.object({
    value: z.coerce.number().positive("Quantity must be greater than 0"),
    unit: z.enum(QUANTITY_UNITS)
})

const priceSchema = z.object({
    value: z.coerce.number().positive("Price must be greater than 0"),
    unit: z.enum(PRICE_UNITS)
})

export const createPreHarvestListingSchema = z.object({
    body: z.object({
        payload: z.object({
            farmland: objectId,

            title: z
                .string()
                .trim()
                .min(5, "Title must contain at least 5 characters")
                .max(120, "Title cannot exceed 120 characters"),

            sowingDate: z.coerce.date(),

            expectedHarvest: z.coerce.date(),

            expectedYield: quantitySchema.optional(),

            expectedPrice: priceSchema.optional(),

            minimumOrderQuantity: quantitySchema.optional(),

            qualityGrade: z.enum(QUALITY_GRADES).optional(),

            description: z
                .string()
                .trim()
                .min(10, "Description must contain at least 10 characters")
                .optional(),

            category: z.enum(CATEGORY)
        })
    })
})

export const getPreHarvestListingQuerySchema = z.object({
    query: z.object({
        page: z.coerce.number().int().positive().optional(),

        limit: z.coerce.number().int().positive().max(50).optional(),

        state: z.string().trim().min(2).optional(),

        district: z.string().trim().min(2).optional(),

        qualityGrade: z.enum(QUALITY_GRADES).optional(),

        category: z.enum(CATEGORY).optional(),

        minPrice: z.coerce.number().positive().optional(),

        maxPrice: z.coerce.number().positive().optional(),

        search: z.string().trim().optional(),

        sort: z.enum(["price_asc", "price_desc", "newest"]).optional()
    })
})

export const getMyPreHarvestListingQuerySchema = z.object({
    query: z.object({
        page: z.coerce.number().int().positive().optional(),

        limit: z.coerce.number().int().positive().max(50).optional(),

        status: z.enum(LISTING_STATUS).optional(),

        moderation: z.enum(MODERATION_STATUS).optional()
    })
})

export const getSinglePreHarvestListingSchema = z.object({
    params: z.object({
        listingId: objectId
    })
})

export const updatePreHarvestListingSchema = z.object({
    params: z.object({
        listingId: objectId
    }),

    body: z.object({
        title: z
            .string()
            .trim()
            .min(5, "Title must contain at least 5 characters")
            .max(120, "Title cannot exceed 120 characters")
            .optional(),

        description: z
            .string()
            .trim()
            .min(10, "Description must contain at least 10 characters")
            .optional(),

        qualityGrade: z.enum(QUALITY_GRADES).optional(),

        minimumOrderQuantity: quantitySchema.partial().optional(),

        expectedPrice: priceSchema.partial().optional(),

        expectedYield: quantitySchema.partial().optional(),

        expectedHarvest: z.coerce.date().optional(),

        removeImages: z
            .array(z.string().min(1))
            .max(5, "You can remove a maximum of 5 images")
            .optional()
    })
})