const passport = require("passport");
const User = require("../../../models/user");
const FacebookStrategy = require("passport-facebook").Strategy;
const { createNewUser } = require("..");

const strategy = new FacebookStrategy(
    {
        clientID: process.env.NODE_ENV === "production" ? process.env.FACEBOOK_CLIENT_ID_PROD : process.env.FACEBOOK_CLIENT_ID_DEV,
        clientSecret: process.env.NODE_ENV === "production" ? process.env.FACEBOOK_CLIENT_SECRET_PROD : process.env.FACEBOOK_CLIENT_SECRET_DEV,
        callbackURL:
            (process.env.NODE_ENV === "production" ? process.env.PROD_URL : "http://localhost:" + process.env.PORT) + "/api/v1.1/login/facebook/callback",
        profileFields: ["id", "emails", "displayName"],
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
