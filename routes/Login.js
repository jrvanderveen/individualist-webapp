const express = require("express");
const router = express.Router();
const { signUp, signIn, signOut } = require("../controlers/Login");

// Preserve this order
router.route("/signUp").post(signUp);
router.route("/signIn").post(signIn);
router.route("/signOut").get(signOut);

module.exports = router;
