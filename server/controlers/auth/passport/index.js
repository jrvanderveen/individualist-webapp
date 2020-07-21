const passport = require("passport");
const LocalStrategy = require("./LocalStrategy");
const GoogleStrategy = require("./GoogleStrategy");
const FacebookStrategy = require("./FacebookStrategy");
const User = require("../../../models/User");

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
    if (process.env.LOGING_LEVEL === "verbose") {
        console.log("*** serializeUser called, user: ".yellow, user);
        console.log(user); // the whole raw user object!
        console.log("---------");
    }
    done(null, { _id: user._id });
});

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
    if (process.env.LOGING_LEVEL === "verbose") console.log("DeserializeUser called".yellow, id);
    User.findOne({ _id: id }, "username", (err, user) => {
        if (process.env.LOGING_LEVEL === "verbose") {
            console.log("*** Deserialize user, user:");
            console.log(user);
            console.log("--------------");
        }
        done(null, user);
    });
});
FacebookStrategy;
//  Use Strategies
passport.use(LocalStrategy);

passport.use(GoogleStrategy);

passport.use(FacebookStrategy);

module.exports = passport;
