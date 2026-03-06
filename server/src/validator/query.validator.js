import { z } from "zod"

const objectId = z
  .string()
  .trim()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format")

const nameField = z
  .string()
  .trim()
  .min(3, "Full name must contain at least 3 characters")
  .max(100, "Full name is too long")

const textField = z
  .string()
  .trim()
  .min(5, "Must contain at least 5 characters")
  .max(200, "Text is too long")

const messageField = z
  .string()
  .trim()
  .min(10, "Message must contain at least 10 characters")
  .max(2000, "Message is too long")

const phoneField = z
  .string()
  .trim()
  .regex(/^[6-9]\d{9}$/, "Phone number must be a valid 10-digit Indian mobile number")

const emailField = z
  .string()
  .trim()
  .email("Invalid email address")
  .transform(email => email.toLowerCase())

export const createQuerySchema = z.object({
  body: z.object({
    fullname: nameField,

    email: emailField.optional(),

    phone: phoneField.optional(),

    inquiry: z.enum([
      "crop",
      "product",
      "weather",
      "pricing",
      "technical",
      "account",
      "other"
    ], {
      errorMap: () => ({
        message: "Invalid inquiry type"
      })
    }),

    subject: textField,

    message: messageField,

    priority: z.enum(["low", "medium", "high", "urgent"]).optional()
  })
})

export const viewMyQuerySchema = z.object({
  query: z.object({
    page: z.coerce
      .number({ invalid_type_error: "Page must be a number" })
      .positive("Page must be greater than 0")
      .optional(),

    limit: z.coerce
      .number({ invalid_type_error: "Limit must be a number" })
      .positive("Limit must be greater than 0")
      .max(100, "Limit cannot exceed 100")
      .optional(),

    status: z
      .enum(["open", "in_progress", "resolved", "closed"])
      .optional()
  })
})

export const viewSingleQuerySchema = z.object({
  params: z.object({
    queryId: objectId
  })
})

export const updateQuerySchema = z.object({
  params: z.object({
    queryId: objectId
  }),

  body: z.object({
    message: z
      .string()
      .trim()
      .min(5, "Message must contain at least 5 characters")
      .max(2000, "Message is too long")
      .optional(),

    subject: z
      .string()
      .trim()
      .min(5, "Subject must contain at least 5 characters")
      .max(200, "Subject is too long")
      .optional()
  })
})

export const closeQuerySchema = z.object({
  params: z.object({
    queryId: objectId
  })
})