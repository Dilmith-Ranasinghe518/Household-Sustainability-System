const nodemailer = require("nodemailer");

// Create transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        service: "gmail", // cleaner than host/port config
        auth: {
            user: process.env.EMAIL_USER || "dilmithsenupa2@gmail.com",
            pass: process.env.EMAIL_PASS || "fqyc clja ywbn zxdg", // MUST be Google App Password
        },
    });
};

// Send OTP email
const sendOTPEmail = async (to, otp) => {
    try {
        // Check env variables
        // if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        //     console.log("⚠️ EMAIL ENV NOT FOUND - MOCK MODE");
        //     console.log(`OTP for ${to}: ${otp}`);
        //     return { success: false, message: "Email service not configured" };
        // }

        const transporter = createTransporter();

        // Verify connection (helps in Render debugging)
        await transporter.verify();

        const mailOptions = {
            from: `"EcoPulse OTP Service" <${process.env.EMAIL_USER}>`,
            to,
            subject: "Your Verification OTP Code",
            text: `Your verification OTP code is: ${otp}

This code will expire in 5 minutes.

If you did not request this, please ignore this email.`,
        };

        const info = await transporter.sendMail(mailOptions);

        console.log(`✅ OTP email sent to ${to}`);
        console.log("Message ID:", info.messageId);

        return { success: true };

    } catch (error) {
        console.error("❌ OTP Email Error:", error);
        return { success: false, message: error.message };
    }
};

module.exports = sendOTPEmail;