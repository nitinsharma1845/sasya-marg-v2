import { z } from "zod"

export const registerBuyerSchema = z.object({
  body: z.object({
    fullname: z.string().min(2, "Full name is required"),
    phone: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Invalid phone number"),
    otp: z.string().length(6, "OTP must be 6 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    email: z.string().email().optional()
  })
})


export const loginBuyerWithPasswordSchema = z.object({
  body: z.object({
    identifier: z.string().min(3, "Email or phone required"),
    password: z.string().min(6, "Password is required")
  })
})


export const loginBuyerWithOtpSchema = z.object({
  body: z.object({
    phone: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Invalid phone number"),
    otp: z.string().length(6, "OTP must be 6 digits")
  })
})



export const forgotBuyerPasswordSchema = z.object({
  body: z.object({
    phone: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Invalid phone number"),
    otp: z.string().length(6, "OTP must be 6 digits"),
    newPassword: z.string().min(6, "New password must be at least 6 characters")
  })
})



export const changeBuyerPasswordSchema = z.object({
  body: z.object({
    oldPassword: z.string().min(6, "Old password is required"),
    newPassword: z.string().min(6, "New password is required")
  })
})



export const updateBuyerAddressSchema = z.object({
  body: z.object({
    address: z.object({
      label: z.string().optional(),
      addressLine: z.string().min(5, "Address line is required"),
      city: z.string().min(2, "City is required"),
      state: z.string().min(2, "State is required"),
      pincode: z
        .string()
        .regex(/^\d{6}$/, "Invalid pincode")
    })
  })
})

export const updateBuyerProfileSchema = z.object({
  body: z.object({
    fullname: z.string().optional(),
    email: z.email().optional()
  })
})