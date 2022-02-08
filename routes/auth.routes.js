const express = require("express");
const { signUp, logIn } = require("../controller/auth.controller");

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);

module.exports = router;
