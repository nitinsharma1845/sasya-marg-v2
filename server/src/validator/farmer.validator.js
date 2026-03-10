import { z } from "zod";

const phoneSchema = z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Phone number must be a valid 10-digit Indian mobile number");

const otpSchema = z
    .string()
    .trim()
    .regex(/^\d{6}$/, "OTP must be exactly 6 digits");

const passwordSchema = z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .max(100, "Password is too long");

const nameSchema = z
    .string()
    .trim()
    .min(2, "Full name must contain at least 2 characters")
    .max(100, "Full name is too long");

export const sendOtpSchema = z.object({
    query: z.object({
        purpose: z.enum(["login", "register", "forgot_password", "email_verification"], {
            errorMap: () => ({ message: "Purpose must be login, register, forgot_password and email_verification" }),
        }),
    }),

    body: z.object({
        phone: z
            .string()
            .trim()
            .regex(/^[6-9]\d{9}$/, "Phone number must be a valid 10-digit Indian mobile number")
            .optional(),
        email: z
            .string()
            .trim()
            .email("Invalid email")
            .optional(),
    }),
});

export const registerFarmerSchema = z.object({
    body: z.object({
        fullname: nameSchema,
        phone: phoneSchema,
        otp: otpSchema,
        password: passwordSchema,
    }),
});

export const loginFarmerUsingOtpSchema = z.object({
    body: z.object({
        phone: phoneSchema,
        otp: otpSchema,
    }),
});

export const loginFarmerWithPasswordSchema = z.object({
    body: z.object({
        phone: phoneSchema,
        password: passwordSchema,
    }),
});

export const forgotPasswordSchema = z.object({
    body: z.object({
        phone: phoneSchema,
        newPassword: passwordSchema,
        otp: otpSchema,
    }),
});

export const changePasswordSchema = z
    .object({
        body: z.object({
            oldPassword: passwordSchema,
            newPassword: passwordSchema,
        }),
    })
    .refine((data) => data.body.oldPassword !== data.body.newPassword, {
        message: "New password must be different from the old password",
        path: ["body", "newPassword"],
    });

export const changeFarmerDataSchema = z.object({
    body: z.object({
        email: z
            .string()
            .trim()
            .email("Please enter a valid email address")
            .transform((email) => email.toLowerCase()),

        fullname: nameSchema,
    }),
});

export const changeEmailSchema = z.object({
    body: z.object({
        email: z
            .string()
            .trim()
            .email("Invalid email address"),

        otp: z
            .string()
            .trim()
            .length(6, "OTP must be 6 digits"),
    }),
});