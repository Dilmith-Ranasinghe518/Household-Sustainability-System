const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { admin } = require("../middleware/authMiddleware");

const {
  createDisaster,
  getDisasters,
  getDisasterById,
  updateDisaster,
  deleteDisaster,
} = require("../controllers/disasterController");

// ✅ Admin must be logged in for everything 
router.post("/", authMiddleware, admin, createDisaster);
router.get("/", authMiddleware, admin, getDisasters);
router.get("/:id", authMiddleware, admin, getDisasterById);
router.put("/:id", authMiddleware, admin, updateDisaster);
router.delete("/:id", authMiddleware, admin, deleteDisaster);

module.exports = router;
