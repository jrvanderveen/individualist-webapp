const express = require("express");
const router = express.Router();
const { signUp, signIn, signOut, userState, signInGoogleRedirect } = require("../controlers/Login");
const passport = require("passport");

// Preserve this order
router.route("/state").post(userState);
router.route("/signUp").post(signUp);
router.route("/signIn").all(passport.authenticate("local")).post(signIn);
router.route("/signOut").get(signOut);

//OAuth
//GOOGLE
router.route("/api/v1.1/login/google").all(passport.authenticate("google", { scope: ["profile"] }));
router
    .route("/google/callback")
    .all(passport.authenticate("google", { failureRedirect: "/login" }))
    .get(signInGoogleRedirect);

module.exports = router;
