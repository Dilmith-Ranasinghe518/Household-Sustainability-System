const Product = require("../models/Product");
const { calculateCarbon } = require("../services/carbonService");

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, category, condition } = req.body;

    if (!title || !category) {
      return res.status(400).json({
        message: "Title and category are required to create a product."
      });
    }

    const co2Saved = await calculateCarbon(category);

    const product = new Product({
      title,
      description,
      price,
      category,
      condition,
      seller: req.user.id,
      co2Saved,
      status: "Available"
    });

    await product.save();

    return res.status(201).json({
      message: "Product listed successfully.",
      product
    });

  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while creating the product.",
      error: error.message
    });
  }
};


// Get All Products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: "Available" })
      .populate("seller", "username email");

    return res.json({
      message: "Available products fetched successfully.",
      count: products.length,
      products
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve products.",
      error: error.message
    });
  }
};


// Get Single Product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("seller", "username email");

    if (!product) {
      return res.status(404).json({
        message: "Product not found."
      });
    }

    return res.json({
      message: "Product retrieved successfully.",
      product
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving product.",
      error: error.message
    });
  }
};


// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found."
      });
    }

    if (product.seller.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to update this product."
      });
    }

    const { category } = req.body;

    // Recalculate carbon only if category changed
    if (category && category !== product.category) {
      const newCo2 = await calculateCarbon(category);
      product.co2Saved = newCo2;
    }

    Object.assign(product, req.body);

    await product.save();

    return res.json({
      message: "Product updated successfully.",
      product
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to update product.",
      error: error.message
    });
  }
};


// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found."
      });
    }

    if (product.seller.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to delete this product."
      });
    }

    await product.deleteOne();

    return res.json({
      message: "Product deleted successfully."
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error deleting product.",
      error: error.message
    });
  }
};
