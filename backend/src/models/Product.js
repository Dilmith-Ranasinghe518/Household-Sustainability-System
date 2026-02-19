const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    imageUrl: String,
    price: Number,
    category: { type: String, required: true },
    condition: String,
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    status: {
        type: String,
        enum: ["Available", "Reserved", "Sold"],
        default: "Available"
    },

    co2Saved: Number
    
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
