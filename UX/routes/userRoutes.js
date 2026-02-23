const router = require("express").Router();
const { protect } = require("../middlewares/authMiddleware");

const {
  viewAll,
  viewByEmail,
  deleteEmp,
  viewMe,
  updateMe
} = require("../controllers/userController");

// Admin
router.get("/all", protect(["admin"]), viewAll);
router.get("/employee/:email", protect(["admin"]), viewByEmail);
router.delete("/employee/:id", protect(["admin"]), deleteEmp);

// User
router.get("/me", protect(["user"]), viewMe);
router.put("/me", protect(["user"]), updateMe);

module.exports = router;