const passport = require("passport");
const User = require("../../../models/user");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { createNewUser } = require("..");

const strategy = new GoogleStrategy(
    {
        clientID: process.env.NODE_ENV === "production" ? process.env.GOOGLE_CLIENT_ID_PROD : process.env.GOOGLE_CLIENT_ID_DEV,
        clientSecret: process.env.NODE_ENV === "production" ? process.env.GOOGLE_CLIENT_SECRET_PROD : process.env.GOOGLE_CLIENT_SECRET_DEV,
        callbackURL: (process.env.NODE_ENV === "production" ? process.env.PROD_URL : "http://localhost:" + process.env.PORT) + "/api/login/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
        User.findOne({ authId: profile.id }).then((user) => {
            if (user) {
                return done(null, user);
            } else {
                try {
                    createNewUser(null, { profile: profile, type: "google" }).then((user) => {
                        return done(null, user);
                    });
                } catch (err) {
                    return done(err);
                }
            }
        });
    }
);

module.exports = strategy;
