import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS
    }
})

export const sendEmail = async ({ to, subject, html }) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to,
            subject,
            html
        })
    } catch (error) {
        console.error("Email sending failed:", error)
        throw new Error("Email service failed")
    }
}