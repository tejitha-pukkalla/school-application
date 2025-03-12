const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {auth} = require("../middlewares/authmiddleware");



router.post("/register", auth,authController.register);
router.post("/login",auth,authController.user_login);

module.exports = router;
