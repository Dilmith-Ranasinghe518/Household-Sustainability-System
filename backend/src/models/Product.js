const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    price: Number,
    category: { type: String, required: true },
    condition: String,
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    status: {
        type: String,
        enum: ["Available", "Reserved", "Sold"],
        default: "Available"
    },

    co2Saved: Number, 

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Product", productSchema);
