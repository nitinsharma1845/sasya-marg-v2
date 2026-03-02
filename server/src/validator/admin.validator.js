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

export const getAllAdminSchema = z.object({
  query: z.object({
    fullname: z.string().optional(),
    page: z.coerce.number().optional(),
    limit: z.coerce.number().optional(),
    isActive: z.coerce.boolean().optional()
  })
})

export const globalSearchSchema = z.object({
  query: z.object({
    search: z.string().trim().optional(),
    page: z.coerce.number().optional().default(1),
    limit: z.coerce.number().optional().default(10),
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
    page: z.coerce.number().positive().optional(),
    limit: z.coerce.number().positive().optional(),
    action: z.enum(["pending", "approved", "rejected"]).optional(),
    search: z.string().optional()
  })
})

export const getSingleListing = z.object({
  params: z.object({
    productId: objectId
  })
})

export const getSingleReportSchema = z.object({
  params: z.object({
    reportId: objectId
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
    page: z.coerce.number().positive().optional(),
    limit: z.coerce.number().positive().optional(),
    inquiery: z.enum(["crop", "product", "weather", "pricing", "technical", "other"]).optional(),
    status: z.enum(["open", "in_progress", "resolved", "closed"]).optional(),
    priority: z.enum(["low", "medium", "high", "urgent"]).optional()
  })
})

export const getAllReportsSchema = z.object({
  query: z.object({
    page: z.coerce.number().positive().optional(),
    limit: z.coerce.number().positive().optional(),
    reason: z.enum([
      "FAKE_PRODUCT",
      "MISLEADING_INFO",
      "PRICE_FRAUD",
      "DUPLICATE_LISTING",
      "SPAM",
      "OTHER"
    ]).optional(),
    status: z.enum(["pending", "reviewed", "action_taken", "rejected"]).optional()
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

export const replyQuerySchema = z.object({
  params: z.object({
    queryId: objectId
  }),
  body: z.object({
    reply: z.string()
  })
})

export const replyReportSchema = z.object({
  params: z.object({
    reportId: objectId
  }),
  body: z.object({
    reply: z.string()
  })
})

export const getAllFarmerSchema = z.object({
  query: z.object({
    page: z.coerce.number().positive().optional(),
    limit: z.coerce.number().positive().optional(),
    isVarified: z.coerce.boolean().optional(),
    isActive: z.coerce.boolean().optional(),
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
    page: z.coerce.number().positive().optional(),
    limit: z.coerce.number().positive().optional(),
    isBlocked: z.coerce.boolean().optional(),
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

export const getBuyerByIdSchema = z.object({
  params: z.object({
    buyerId: objectId
  })
})

export const getFarmerByIdSchema = z.object({
  params: z.object({
    farmerId: objectId
  })
})

export const getAdminByIdSchema = z.object({
  params: z.object({
    adminId: objectId
  })
})

//profile validators

export const changePasswordSchema = z.object({
  body: z.object({
    newPassword: z.string().min(8, "Password contains at least 8 character"),
    oldPassword: z.string().min(8, "Password contains at least 8 character")
  })
})

export const changeNameSchema = z.object({
  body: z.object({
    newFullname: z.string()
  })
})

export const changePhoneNumberSchema = z.object({
  body: z.object({
    newPhone: z.string().length(10).regex(/^[6-9]\d{9}$/),
    otp: z.string().length(6, "Otp must be of 6 digits"),
    purpose: z.enum(["login", "register", "forgot_password"])
  })
})

export const changeEmailSchema = z.object({
  body: z.object({
    newEmail: z.email(),
  })
})


export const getAdminLogsSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 1))
    .refine((val) => val > 0, {
      message: "Page must be greater than 0"
    }),

  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 20))
    .refine((val) => val > 0 && val <= 100, {
      message: "Limit must be between 1 and 100"
    }),

  role: z
    .enum(["admin", "farmer", "buyer"])
    .optional(),

  action: z
    .string()
    .optional(),

  search: z
    .string()
    .max(100)
    .optional(),

  startDate: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid startDate format"
    }),

  endDate: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid endDate format"
    })
})

export const getNewsletterSubscribers = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 1))
    .refine((val) => val > 0, {
      message: "Page must be greater than 0"
    }),

  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 20))
    .refine((val) => val > 0 && val <= 100, {
      message: "Limit must be between 1 and 100"
    }),
  isActive: z.boolean().optional(),
  search: z.string().optional()
})