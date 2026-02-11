const jwt = require("jsonwebtoken");
const Roles = require("../utils/roles");

module.exports = function (req, res, next) {

  // ✅ Support both: x-auth-token and Authorization: Bearer <token>
  let token = req.header("x-auth-token");

  if (!token) {
    const authHeader = req.header("authorization"); // "Bearer <token>"
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];

    // Get token from header
    const authHeader = req.header('Authorization');

    // Check if not token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'No token, authorization denied' });

    }
  }


  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }

    const token = authHeader.split(' ')[1];

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }

};

module.exports.admin = function (req, res, next) {
  if (req.user && req.user.role === Roles.ADMIN) return next();
  return res.status(403).json({ msg: "Access denied: Admins only" });
};
}