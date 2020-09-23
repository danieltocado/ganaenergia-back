  
const express = require("express");

const auth = require("../middlewares/auth.js");

const UserController = require("../controllers/UserController");

const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/logout", auth, UserController.logout);

module.exports = router;