import bcrypt from "bcryptjs"
import { Otp } from "../models/otp.model.js"
import { ApiError } from "../utils/apiError.js"
import twilio from "twilio"
import { sendEmail } from "./email.service.js";
import { otpVerificationTemplate } from "./templates.service.js";
import twilioClient from "../utils/twillioClient.js";

const generateOtp = (length = 6) => {
  const digits = "0123456789";
  let otp = "";

  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }

  return otp;
};

export const sendOtpService = async ({ phone, email, purpose }) => {

  const otp = generateOtp(6)

  const expiresAt = new Date(Date.now() + 5 * 60 * 1000)

  // EMAIL OTP
  if (purpose === "email_verification") {

    if (!email) throw new ApiError(400, "Email is required")

    await Otp.deleteMany({ email, purpose })

    await Otp.create({
      otp,
      purpose,
      email,
      expiresAt
    })

    const html = otpVerificationTemplate({
      userName: email,
      otpCode: otp,
      expireMinutes: 5
    })

    await sendEmail({
      to: email,
      subject: "Your 6 digit OTP for verification",
      html
    })

    console.log(`${otp} OTP sent to ${email}`)

    return true
  }

  // PHONE OTP
  if (!phone) throw new ApiError(400, "Phone is required")

  await Otp.deleteMany({ phone, purpose })

  await Otp.create({
    otp,
    purpose,
    phone,
    expiresAt
  })

  const formattedPhone = phone.startsWith("+91") ? phone : `+91${phone}`

  await twilioClient.messages.create({
    body: `Your 6 digit verification code for ${purpose} is: ${otp}`,
    messagingServiceSid: process.env.TWILIO_MESSEGING_SID,
    to: formattedPhone
  })

  console.log(`${otp} OTP sent to ${phone}`)

  return true
}


export const verifyOtpService = async ({ phone, email, purpose, otp }) => {

  let query = {
    purpose,
    isUsed: false,
    isBlocked: false
  }

  if (purpose === "email_verification") {

    if (!email) {
      throw new ApiError(400, "Email is required for email verification")
    }

    query.email = email

  } else {

    if (!phone) {
      throw new ApiError(400, "Phone is required for this purpose")
    }

    query.phone = phone
  }


  const otpDoc = await Otp.findOne(query)

  if (!otpDoc) {
    throw new ApiError(
      400,
      "OTP expired or already used. Please request a new one."
    )
  }

  if (otpDoc.expiresAt < new Date()) {
    otpDoc.isBlocked = true
    await otpDoc.save()

    throw new ApiError(400, "OTP expired. Please request a new one.")
  }

  if (otpDoc.attempts >= otpDoc.maxAttempts) {
    otpDoc.isBlocked = true
    await otpDoc.save()

    throw new ApiError(
      429,
      "OTP attempts exceeded. Please request a new one."
    )
  }

  const isValid = await bcrypt.compare(otp, otpDoc.otp)

  if (!isValid) {
    otpDoc.attempts += 1
    await otpDoc.save()

    throw new ApiError(400, "Invalid OTP")
  }

  otpDoc.isUsed = true
  await otpDoc.save()

  return true
}
