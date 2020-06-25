const express = require("express");
const router = express.Router();
const { signUp, signIn, signOut, userState } = require("../controlers/Login");
const passport = require("passport");

// Preserve this order
router.route("/state").post(userState);
router.route("/signUp").post(signUp);
router.route("/signIn").all(passport.authenticate("local")).post(signIn);
router.route("/signOut").get(signOut);

module.exports = router;
