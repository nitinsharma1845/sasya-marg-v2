import { createLimiter } from "./rateLimiter.middleware.js"

export const sendOtpLimit = createLimiter({
    windowMs: 1000 * 60 * 5, //5 minutes
    max: 3,
    message: "Too many OTP requests. Please wait before retrying"
})

export const changePasswordLimiter = createLimiter({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Too many attempts, Try later"
})

export const loginFarmerLimiter = createLimiter({
    windowMs: 1000 * 60 * 5,
    max: 10,
    message: "Too many login attempts, Try later"
})

export const changeDataLimiter = createLimiter({
    windowMs: 1000 * 60 * 10,
    max: 10,
    message: "To many attempts try again later"
})


export const authApiLimiter = createLimiter({
    windowMs: 1000 * 60 * 5,
    max: 5,
    message: "To many requests, try again after some time."
})

export const normalApiLimiter = createLimiter({
    windowMs: 1000 * 60 * 15,
    max: 100,
    message: "To many requestes, try again after some time."
})

export const updateApiLimiter = createLimiter({
    windowMs: 1000 * 60 * 5,
    max: 8,
    message: "To many requestes, try again after some time."
})

export const createApiLimiter = createLimiter({
    windowMs: 1000 * 60 * 10,
    max: 4,
    message: "To many requestes, try again after some time."
})

export const wishlistApiLimiter = createLimiter({
    windowMs: 1000 * 60 * 10,
    max: 20,
    message: "To many requestes, try again after some time."
})