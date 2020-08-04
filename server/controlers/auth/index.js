const User = require("../../models/user");
const GrocerySections = require("../../models/grocerySections");
const ShoppingList = require("../../models/shoppingList");
const Recipe = require("../../models/recipe");
const fs = require("fs");

// @desc On app start determine if user is authenticated
// @route GET /api/login/state
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
// @route GET /api/login/signUp
// @access Public
exports.signUp = async (req, res, next) => {
    console.log("Sign Up");
    const { username, email, password, repeatPassword } = req.body;
    User.findOne({ username: username }).then((user) => {
        if (user) {
            return res.status(200).json({
                success: false,
                error: `Sorry, already a user with the username: ${username}`,
            });
        } else {
            try {
                this.createNewUser({ username, email, password, repeatPassword }, null).then((data) => {
                    res.json(data);
                });
            } catch {
                return res.status(500).json({
                    success: false,
                    error: "Server Error",
                });
            }
        }
    });
};
// Helper method to create new user
exports.createNewUser = async (localUser, authUser) => {
    let newUser = {};
    if (localUser) {
        newUser = new User({
            username: localUser.username,
            email: localUser.email,
            authType: "local",
            password: localUser.password,
        });
    } else {
        newUser = new User({
            username: authUser.profile.displayName,
            authId: authUser.profile.id,
            authType: authUser.type,
            email: authUser.profile.emails.length > 0 ? authUser.profile.emails[0].value : "",
            password: authUser.profile.id,
        });
    }
    const savedUser = await User.create(newUser);
    this.setUserDefaults(savedUser._id);
    return savedUser;
};
// Helper method to create default user documents
exports.setUserDefaults = (userId) => {
    console.log("Set up new user");
    try {
        jsonReader("./server/controlers/auth/data/SignUpGrocerySections.json", (err, grocerySections) => {
            if (err) {
                console.log(err);
                return;
            }
            grocerySections["userId"] = userId;
            GrocerySections.create(grocerySections);
        });

        jsonReader("./server/controlers/auth/data/SignUpShoppinglist.json", (err, shoppingList) => {
            if (err) {
                console.log(err);
                return;
            }
            shoppingList["userId"] = userId;
            ShoppingList.create(shoppingList);
        });

        jsonReader("./server/controlers/auth/data/SignUpRecipes.json", (err, recipes) => {
            if (err) {
                console.log(err);
                return;
            }
            recipes.forEach((recipe) => {
                recipe["userId"] = userId;
            });
            Recipe.insertMany(recipes);
        });
    } catch (err) {
        console.log(`ERROR: Creating user default documents`.red);
    }
};

//Read File Helper
function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return cb && cb(err);
        }
        try {
            const object = JSON.parse(fileData);
            return cb && cb(null, object);
        } catch (err) {
            return cb && cb(err);
        }
    });
}

// @desc Sign user into MongoStore and create passport session cookie
// @route GET /api/login/signIn
// @access Public
exports.signIn = async (req, res, next) => {
    res.send({
        username: req.user.username,
        success: true,
    });
};

// @desc Sign user out
// @route GET /api/login/signOut
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

// @desc Sign user in with google auth
// @route GET /api/login/signIn/google
// @access Public
exports.signInGoogleRedirect = async (req, res, next) => {
    res.redirect(process.env.NODE_ENV === "production" ? "/" : "http://localhost:3000");
};
