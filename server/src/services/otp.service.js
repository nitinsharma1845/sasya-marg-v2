import bcrypt from "bcryptjs"
import { Otp } from "../models/otp.model.js"
import { ApiError } from "../utils/apiError.js"
import twilio from "twilio"

const generateOtp = (length = 6) => {
  const digits = "0123456789";
  let otp = "";

  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }

  return otp;
};

export const sendOtpService = async ({ phone, purpose }) => {

  const otp = generateOtp(6)

  const accountSid = process.env.TWILIO_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN

  const client = twilio(accountSid, authToken)

  await Otp.deleteMany({
    phone,
    purpose,
    expiresAt: { $lt: new Date() }
  });


  const otpDoc = await Otp.create({
    otp: otp,
    purpose,
    phone,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000)
  })

  if (!otpDoc) throw new ApiError(500, "Error while sending otp")

  console.log(`${otp} Otp sent to ${phone}`)
  const formattedPhone = phone.startsWith("+91")
    ? phone
    : `+91${phone}`;

  // Twilio SMS Send
  const message = await client.messages.create({
    body: `Your 6 digit verification code for ${purpose} is: ${otp}`,
    messagingServiceSid: process.env.TWILIO_MESSEGING_SID,
    to: formattedPhone
  })

  console.log("Message :", message.body)

  return true
}


export const verifyOtpService = async ({ phone, purpose, otp }) => {
  const otpDoc = await Otp.findOne({
    phone,
    purpose,
    isUsed: false,
    isBlocked: false,
  });

  if (!otpDoc) {
    throw new ApiError(
      400,
      "OTP expired or already used. Please request a new one."
    );
  }

  if (otpDoc.expiresAt < new Date()) {
    otpDoc.isBlocked = true;
    await otpDoc.save();
    throw new ApiError(400, "OTP expired. Please request a new one.");
  }

  if (otpDoc.attempts >= otpDoc.maxAttempts) {
    otpDoc.isBlocked = true;
    await otpDoc.save();
    throw new ApiError(
      429,
      "OTP attempts exceeded. Please request a new one."
    );
  }

  const isValid = await bcrypt.compare(otp, otpDoc.otp);

  if (!isValid) {
    otpDoc.attempts += 1;
    await otpDoc.save();
    throw new ApiError(400, "Invalid OTP");
  }


  otpDoc.isUsed = true;
  await otpDoc.save();

  return true;
};

