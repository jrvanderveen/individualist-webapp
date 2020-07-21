const passport = require("passport");
const User = require("../models/User");
const FacebookStrategy = require("passport-facebook").Strategy;
const { setUserDefaults } = require("../controlers/Login");

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
                const newUser = new User({
                    username: profile.displayName,
                    authId: profile.id,
                    authType: "facebook",
                    email: profile.emails.length > 0 ? profile.emails[0].value : "",
                    password: profile.id,
                });
                console.log(newUser);
                newUser.save((err, savedUser) => {
                    console.log(err);
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            error: `Server Error`,
                        });
                    }
                    setUserDefaults(savedUser._id);
                    user = newUser;
                    return done(null, user);
                });
            }
            console.log("findOneAndUpdate Complete");
        });
    }
);

module.exports = strategy;
