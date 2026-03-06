import { z } from "zod"

const objectId = z
    .string()
    .trim()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format")

const textField = z
    .string()
    .trim()
    .min(2, "Must contain at least 2 characters")
    .max(100, "Too long")

const coordinateSchema = z.object({
    lat: z
        .number({ invalid_type_error: "Latitude must be a number" })
        .min(-90, "Latitude must be greater than -90")
        .max(90, "Latitude must be less than 90")
        .optional(),

    lon: z
        .number({ invalid_type_error: "Longitude must be a number" })
        .min(-180, "Longitude must be greater than -180")
        .max(180, "Longitude must be less than 180")
        .optional()
})

export const createFarmLandSchema = z.object({
    body: z.object({
        location: z.object({
            locality: textField.optional(),
            district: textField.optional(),
            state: textField.optional(),
            country: textField.optional(),
            coordinates: coordinateSchema.optional()
        }),

        name: z
            .string()
            .trim()
            .min(2, "Name must contain at least 2 characters")
            .max(100, "Name is too long"),

        size: z.object({
            value: z
                .number({ invalid_type_error: "Size must be a number" })
                .positive("Size must be greater than 0"),

            unit: z.enum(["sqft", "sqm", "acre", "hectare", "beegha"], {
                errorMap: () => ({
                    message: "Unit must be sqft, sqm, acre, hectare or beegha"
                })
            })
        }),

        soilType: textField,

        farmingType: z.enum(["organic", "conventional"]).optional(),

        water: z.object({
            type: textField,
            source: textField
        }),

        budget: z.coerce
            .number({ invalid_type_error: "Budget must be a number" })
            .positive("Budget must be greater than 0")
            .optional()
    })
})

export const updateFarmLandSchema = z.object({
    params: z.object({
        farmLandId: objectId
    }),

    body: z.object({
        name: z
            .string()
            .trim()
            .min(2, "Name must contain at least 2 characters")
            .max(100, "Name is too long")
            .optional(),

        size: z.object({
            value: z
                .number({ invalid_type_error: "Size must be a number" })
                .positive("Size must be greater than 0")
                .optional(),

            unit: z.enum(["sqft", "sqm", "acre", "hectare", "beegha"]).optional()
        }).optional(),

        soilType: textField.optional(),

        water: z.object({
            type: textField.optional(),
            source: textField.optional()
        }).optional(),

        budget: z
            .number({ invalid_type_error: "Budget must be a number" })
            .positive("Budget must be greater than 0")
            .optional(),

        farmingType: z.enum(["organic", "conventional"]).optional()
    })
})

export const toggleFarmLandStatus = z.object({
    params: z.object({
        farmLandId: objectId
    })
})

export const getSingleFarmlandSchema = z.object({
    params: z.object({
        farmlandId: objectId
    })
})