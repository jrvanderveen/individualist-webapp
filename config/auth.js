module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            console.log("authenticated");
            return next();
        }
        res.json({ redirect: "/login" });
    },

    forwardAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect("/");
    },
};
