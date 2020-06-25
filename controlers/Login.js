const User = require("../models/User");
const passport = require("passport");

// @desc On app start determine if user is authenticated
// @route GET /api/v1.1/login/state
// @access Public
exports.userState = async (req, res, next) => {
    const loggedIn = req.isAuthenticated();
    const username = loggedIn ? req.user.username : "";
    try {
        return res.status(200).json({
            success: loggedIn,
            username: username,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};

// @desc Sign user up for site and store session
// @route GET /api/v1.1/login/signUp
// @access Public
exports.signUp = async (req, res, next) => {
    console.log("Sign Up");
    const { username, email, password, repeatPassword } = req.body;
    console.log(username, email, password, repeatPassword);
    User.findOne({ username: username }).then((user) => {
        if (user) {
            return res.status(200).json({
                success: false,
                error: `Sorry, already a user with the username: ${username}`,
            });
        } else {
            const newUser = new User({
                username: username,
                email: email,
                password: password,
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
                createDefaultGrocerySections(savedUser._id);
                res.json(savedUser);
            });
        }
    });
};

// Helper method to create default grocery section document
const createDefaultGrocerySections = async (userId) => {
    console.log("createDefaultGrocerySections");
    try {
        const grocerySectionObject = {
            userId: userId,
            default: "Other",
            sections: ["Other", "Produce", "Meat"],
        };
        const grocerySectionsDoc = await GrocerySections.create(grocerySectionObject);
    } catch (err) {
        console.log(`ERROR: Creating default grocery section document`.red);
    }
};

// @desc Sign user into MongoStore and create passport session cookie
// @route GET /api/v1.1/login/signIn
// @access Public
exports.signIn = async (req, res, next) => {
    res.send({
        username: req.user.username,
        success: true,
    });
};

// @desc Sign user out
// @route GET /api/v1.1/login/signOut
// @access Public
exports.signOut = async (req, res, next) => {
    console.log("Sign Out");
    if (req.user) {
        req.logout();
        res.send({ msg: "logging out" });
    } else {
        res.send({ msg: "no user to log out" });
    }
};
