const express = require("express");
const {
  register,
  login,
  getUsers,
  logout,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", protect, logout);
router.get("/users", protect, getUsers);

module.exports = router;
