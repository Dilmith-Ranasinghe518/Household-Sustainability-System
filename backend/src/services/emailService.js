const nodemailer = require("nodemailer");

// Create transporter using SMTP (Render safe)
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // TLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false, // prevents SSL issues on cloud
    },
});

const sendEmail = async (to, subject, text, html = null) => {
    try {
        // If env variables are missing → log instead of crashing
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.log("⚠️ EMAIL ENV NOT FOUND - MOCK MODE");
            console.log("---------------------------------------------------");
            console.log(`[MOCK EMAIL] To: ${to}`);
            console.log(`[MOCK EMAIL] Subject: ${subject}`);
            console.log(`[MOCK EMAIL] Body: ${text}`);
            console.log("---------------------------------------------------");
            return;
        }

        const mailOptions = {
            from: `"OTP Service" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html,
        };

        await transporter.sendMail(mailOptions);

        console.log(`✅ Email sent successfully to ${to}`);
    } catch (error) {
        console.error("❌ Error sending email:", error.message);

        console.log("---------------------------------------------------");
        console.log(`[FAILED EMAIL LOG] To: ${to}`);
        console.log(`[FAILED EMAIL LOG] Subject: ${subject}`);
        console.log(`[FAILED EMAIL LOG] Body: ${text}`);
        console.log("---------------------------------------------------");
    }
};

module.exports = sendEmail;