const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

// Sustainability reward helper
async function awardSustainabilityPoints(order) {
  const co2Value = order.product.co2Saved || 0;

  const buyer = await User.findById(order.buyer);
  const seller = await User.findById(order.product.seller);

  if (buyer) {
    buyer.sustainabilityScore += co2Value;
    await buyer.save();
  }

  if (seller) {
    seller.sustainabilityScore += co2Value;
    await seller.save();
  }
}


// Create Order (Buy Now)
exports.createOrder = async (req, res) => {
  try {
    const product = await Product.findById(req.body.productId);

    if (!product || product.status !== "Available") {
      return res.status(400).json({
        message: "This product is not available for purchase."
      });
    }

    if (product.seller.toString() === req.user.id) {
      return res.status(400).json({
        message: "You cannot place an order on your own product."
      });
    }

    const order = new Order({
      product: product._id,
      buyer: req.user.id,
      status: "Pending"
    });

    product.status = "Reserved";
    await product.save();
    await order.save();

    return res.status(201).json({
      message: "Order placed successfully. Waiting for seller confirmation.",
      order
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to create order.",
      error: error.message
    });
  }
};


// Confirm Order (Seller)
exports.confirmOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("product");

    if (!order) {
      return res.status(404).json({
        message: "Order not found."
      });
    }

    if (order.product.seller.toString() !== req.user.id) {
        return res.status(403).json({
            message: "Only the seller can confirm this order."
        });
    }

    if (order.status !== "Pending") {
        return res.status(400).json({
            message: "Only pending orders can be confirmed."
        });
    }

    if (order.status === "Confirmed") {
        return res.status(400).json({
            message: "This order has already been confirmed."
        });
    }

    order.status = "Confirmed";
    order.product.status = "Sold";

    await awardSustainabilityPoints(order);

    await order.product.save();
    await order.save();

    return res.json({
      message: "Order confirmed successfully. Sustainability points awarded.",
      order
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to confirm order.",
      error: error.message
    });
  }
};


// Cancel Order
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("product");

    if (!order) {
        return res.status(404).json({
            message: "Order not found."
        });
    }

    if (order.status !== "Pending") {
        return res.status(400).json({
            message: "Only pending orders can be cancelled."
        });
    }

    if (order.status === "Confirmed") {
        return res.status(400).json({
            message: "Confirmed orders cannot be cancelled."
        });
    }

    order.status = "Cancelled";
    order.product.status = "Available";

    await order.product.save();
    await order.save();

    return res.json({
      message: "Order cancelled successfully.",
      order
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to cancel order.",
      error: error.message
    });
  }
};
