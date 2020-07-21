const passport = require("passport");
const User = require("../models/User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const strategy = new GoogleStrategy(
    {
        clientID: process.env.NODE_ENV === "production" ? process.env.GOOGLE_CLIENT_ID_PROD : process.env.GOOGLE_CLIENT_ID_DEV,
        clientSecret: process.env.NODE_ENV === "production" ? process.env.GOOGLE_CLIENT_SECRET_PROD : process.env.GOOGLE_CLIENT_SECRET_DEV,
        callbackURL: "http://localhost:5000/api/v1.1/login/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
        console.log(profile.displayName);
        User.findOneAndUpdate(
            { username: profile.displayName },
            {
                $setOnInsert: { password: profile.id, email: "" },
            },
            { returnOriginal: true, upsert: true }
        ).then((user) => {
            console.log(user);
            return done(null, user);
        });
        console.log("findOneAndUpdate Complete");
    }
);

module.exports = strategy;
