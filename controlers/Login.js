const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");

// @desc Get all recipes
// @route GET /api/v1/recipes
// @access Public
exports.signUp = async (req, res, next) => {
    const { userName, email, password } = req.body;
    User.findOne({ email: email }).then((user) => {
        if (user) {
            return res.status(400).json({
                success: false,
                error: "Email already registered",
            });
        } else {
            const newUser = new User({ userName, email, password });
            // Hash Password
            bcrypt.genSalt(10, (err, salt) =>
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;

                    newUser.password = hash;
                    newUser
                        .save()
                        .then((user) => {
                            return res.status(200).json({
                                success: true,
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                            return res.status(500).json({
                                success: false,
                                error: "Server Error",
                            });
                        });
                })
            );
        }
    });
};

// @desc Get all recipes
// @route GET /api/v1/recipes
// @access Public
exports.signIn = async (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
    })(req, res, next);
};
// Logout

exports.signOut = async (req, res, next) => {
    req.logout();
    res.redirect("/login");
};
