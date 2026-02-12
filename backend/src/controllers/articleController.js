const Article = require("../models/Article");

// CREATE (ADMIN)
exports.createArticle = async (req, res) => {
  const article = new Article({
    ...req.body,
    createdBy: req.user.id,
  });

  await article.save();
  res.status(201).json(article);
};

// GET PUBLISHED
exports.getArticles = async (req, res) => {
  const articles = await Article.find({ isPublished: true })
    .sort({ createdAt: -1 });

  res.json(articles);
};

// UPDATE (ADMIN)
exports.updateArticle = async (req, res) => {
  const updated = await Article.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
};

// DELETE (ADMIN)
exports.deleteArticle = async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};
