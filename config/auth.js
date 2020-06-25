module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            if (process.env.LOGING_LEVEL === "verbose") {
                console.log("USER AUTHENTICATED".yellow);
            }

            return next();
        }
        if (process.env.LOGING_LEVEL === "verbose") {
            console.log("USER NOT AUTHENTICATED".red);
            console.log(req.session);
            console.log(req.user);
        }
        res.json({ success: false, redirect: "/login" });
    },

    forwardAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.json({ success: true, redirect: "" });
    },
};
