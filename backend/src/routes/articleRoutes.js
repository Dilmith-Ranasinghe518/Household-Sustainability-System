const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { admin } = require("../middleware/authMiddleware");

const {
  createArticle,
  getArticles,
  updateArticle,
  deleteArticle,
} = require("../controllers/articleController");

router.get("/", getArticles);

router.post("/", [authMiddleware, admin], createArticle);

router.put("/:id", [authMiddleware, admin], updateArticle);

router.delete("/:id", [authMiddleware, admin], deleteArticle);

module.exports = router;

