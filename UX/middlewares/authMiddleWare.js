const { getUser } = require("../utils/sessionStore");

exports.protect = (roles = []) => (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  const user = getUser(token);
  if (!user || (roles.length && !roles.includes(user.role)))
    return res.status(403).json({ error: "Forbidden" });

  req.user = user;
  next();
};