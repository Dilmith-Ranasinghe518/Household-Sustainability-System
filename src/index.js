const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const authMiddleware = require('./middleware/authMiddleware'); // Middleware function
const { admin } = require('./middleware/authMiddleware'); // Admin middleware

const app = express();

// Connect Database
connectDB();
const geminiRoutes = require("./routes/gemini");

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use("/api/gemini", geminiRoutes);


// Test Protected Route
app.get('/api/user/profile', authMiddleware, (req, res) => {
    res.json({ msg: 'This is a protected user route', user: req.user });
});

// Test Admin Route
app.get('/api/admin/dashboard', [authMiddleware, admin], (req, res) => {
    res.json({ msg: 'This is a protected admin route', user: req.user });
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
