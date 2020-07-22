const express = require("express");
const router = express.Router();
const { signUp, signIn, signOut, userState, signInGoogleRedirect } = require("../controlers/auth");
const passport = require("passport");

// Preserve this order
router.route("/state").post(userState);
router.route("/signUp").post(signUp);
router.route("/signIn").all(passport.authenticate("local")).post(signIn);
router.route("/signOut").get(signOut);

//OAuth
//GOOGLE
router.route("/google").all(passport.authenticate("google", { scope: ["profile", "email"] }));
router
    .route("/google/callback")
    .all(passport.authenticate("google", { failureRedirect: process.env.NODE_ENV === "production" ? "/" : "http://localhost:3000" }))
    .get(signInGoogleRedirect);

//Facebook
router.route("/facebook").all(passport.authenticate("facebook", { scope: ["email"] }));
router
    .route("/facebook/callback")
    .all(passport.authenticate("facebook", { failureRedirect: process.env.NODE_ENV === "production" ? "/" : "http://localhost:3000" }))
    .get(signInGoogleRedirect);
module.exports = router;
