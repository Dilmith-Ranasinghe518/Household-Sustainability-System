console.log("🔥 SERVER STARTED - NEW BUILD ACTIVE");
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const authMiddleware = require('./middleware/authMiddleware'); // Middleware function
const { admin } = require('./middleware/authMiddleware'); // Admin middleware
const cron = require("node-cron");
const { processExpiredOrders } = require("./services/orderExpiryService");

const app = express();

// Connect Database
connectDB();
const geminiRoutes = require("./routes/gemini");

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors({
    origin: [
        'http://localhost:5173',
        process.env.CLIENT_URL,
        'https://household-sustainability-system.vercel.app'
    ],
    credentials: true
}));

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use("/api/gemini", geminiRoutes);

app.use("/api/issues", require("./routes/supportTicketRoutes"));
app.use("/api/disasters", require("./routes/disasterRoutes"));


app.use('/api/audit', require('./routes/auditRoutes'));
app.use('/api/waste', require('./routes/wasteRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));
app.use('/api/weather', require('./routes/weatherRoutes'));


//articles and actions
app.use("/api/actions", require("./routes/actionRoutes"));
app.use("/api/articles", require("./routes/articleRoutes"));

app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders/", require("./routes/orderRoutes"));

const User = require('./models/User');

// Test Protected Route
app.get('/api/user/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Test Admin Route
app.get('/api/admin/dashboard', [authMiddleware, admin], (req, res) => {
    res.json({ msg: 'This is a protected admin route', user: req.user });
});



const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);

    cron.schedule("0 0 * * *", async () => {
        try {
            console.log("Checking for expired orders...");
            await processExpiredOrders();
        } catch (error) {
            console.error("Error processing expired orders:", error.message);
        }
    });
});

