const nodemailer = require("nodemailer");

// Gmail SMTP configuration (Render safe)
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

// Send OTP only
const sendOTPEmail = async (to, otp) => {
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.log("⚠️ EMAIL ENV NOT FOUND - MOCK MODE");
            console.log(`OTP for ${to}: ${otp}`);
            return;
        }

        const mailOptions = {
            from: `"EcoPulse OTP Service" <${process.env.EMAIL_USER}>`,
            to: to,
            subject: "Your Verification OTP Code",
            text: `Your verification OTP code is: ${otp}

This code will expire in 5 minutes.

If you did not request this, please ignore this email.`,
        };

        await transporter.sendMail(mailOptions);

        console.log(`✅ OTP email sent to ${to}`);
    } catch (error) {
        console.error("❌ OTP Email Error:", error.message);
    }
};

module.exports = sendOTPEmail;