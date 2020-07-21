const User = require("../../../models/user");
const LocalStrategy = require("passport-local").Strategy;

const strategy = new LocalStrategy(
    {
        usernameField: "username",
    },
    function (username, password, done) {
        console.log("Use local Strategy");
        User.findOne({ username: username }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }
            if (!user.checkPassword(password)) {
                return done(null, false, { message: "Incorrect password" });
            }
            console.log(user);
            return done(null, user);
        });
    }
);

module.exports = strategy;
