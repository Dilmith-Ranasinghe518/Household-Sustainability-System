const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createOrder,
  confirmOrder,
  cancelOrder,
} = require("../controllers/orderController");

router.post("/", authMiddleware, createOrder);

router.put("/:id/confirm", authMiddleware, confirmOrder);

router.put("/:id/cancel", authMiddleware, cancelOrder);

module.exports = router;
