const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
//const {auth} = require("../middlewares/authmiddleware");

router.post("/register", authController.register);
router.post("/login",authController.user_login);

module.exports = router;
