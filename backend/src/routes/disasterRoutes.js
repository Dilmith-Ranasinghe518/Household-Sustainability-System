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


router.get("/", authMiddleware, getDisasters);
router.get("/:id", authMiddleware, getDisasterById);

// keep admin only for create/update/delete
router.post("/", authMiddleware, admin, createDisaster);
router.put("/:id", authMiddleware, admin, updateDisaster);
router.delete("/:id", authMiddleware, admin, deleteDisaster);


module.exports = router;
