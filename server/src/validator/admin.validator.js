import { z } from 'zod'


const objectId = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");


export const revokeInviteSchema = z.object({
  params: z.object({
    inviteId: objectId
  })
})


export const bootstrapSuperAdminSchema = z.object({
  body: z.object({
    fullname: z.string().trim().min(2),
    phone: z.string().length(10),
    email: z
      .string()
      .email("Invalid email address")
      .toLowerCase()
      .trim(),

    phone: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Invalid Indian phone number"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must be at most 32 characters"),

    secret: z
      .string()
      .min(5, "Invalid bootstrap secret")
  })
})


export const adminLoginSchema = z.object({
  body: z.object({
    identifier: z
      .string()
      .min(3, "Email or phone is required")
      .refine(
        (val) =>
          /^[6-9]\d{9}$/.test(val) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
        {
          message: "Identifier must be a valid email or phone number"
        }
      ),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must be at most 32 characters")
  })
})

export const registerAdminSchema = z.object({
  query: z.object({
    inviteToken: z.string().length(64)
  }),

  body: z.object({
    fullname: z.string().min(3),
    email: z.string().email(),
    phone: z.string().length(10).regex(/^[6-9]\d{9}$/),
    password: z.string().min(8)
  })
})


//ADMIN MODERATION SCHEMA

export const getAllListingSchema = z.object({
  query: z.object({
    page: z.number().positive().optional(),
    limit: z.number().positive().optional(),
    action: z.enum(["pending", "approved", "rejected"]).optional()
  })
})

export const moderateListingSchema = z.object({
  params: z.object({
    listingId: objectId
  }),
  body: z.object({
    reason: z.string().min(3).optional(),
    action: z.enum(["pending", "approved", "rejected"])
  })
})

export const getAllQuerySchema = z.object({
  query: z.object({
    page: z.number().positive().optional(),
    limit: z.number().positive().optional(),
    inquiery: z.enum(["crop", "product", "weather", "pricing", "technical", "other"]).optional(),
    status: z.enum(["open", "in_progress", "resolved", "closed"]).optional(),
    priority: z.enum(["low", "medium", "high", "urgent"]).optional()
  })
})

export const updateQuerySchema = z.object({
  params: z.object({
    queryId: objectId
  }),
  body: z.object({
    reply: z.string().min(5).optional(),
    status: z.enum(["open", "in_progress", "resolved", "closed"]).optional(),
    priority: z.enum(["low", "medium", "high", "urgent"]).optional()
  })
})

export const getAllFarmerSchema = z.object({
  query: z.object({
    page: z.number().positive().optional(),
    limit: z.number().positive().optional(),
    isVarified: z.boolean().optional(),
    isActive: z.boolean().optional(),
  })
})

export const blockFarmerSchema = z.object({
  params: z.object({
    farmerId: objectId
  }),
  body: z.object({
    reason: z.string().min(3)
  })


})

export const unBlockFarmerSchema = z.object({
  params: z.object({
    farmerId: objectId
  })
})

export const getAllBuyerSchema = z.object({
  query: z.object({
    page: z.number().positive().optional(),
    limit: z.number().positive().optional(),
    isBlocked: z.boolean().optional(),
  })
})

export const blockBuyerSchema = z.object({
  params: z.object({
    buyerId: objectId
  }),
  body: z.object({
    reason: z.string().min(3)
  })


})

export const unBlockBuyerSchema = z.object({
  params: z.object({
    buyerId: objectId
  })
})