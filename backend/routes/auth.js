const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const verifyToken = require('../middleware/authMiddleware');

router.post("/login", authController.loginUser);
router.post("/register", authController.registerUser);
router.post("/update", verifyToken, authController.updateUser);

module.exports = router;
