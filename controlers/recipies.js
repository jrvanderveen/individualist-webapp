// @desc Get all recipies
// @route GET /api/v1/recipies
// @access Public
exports.getRecipies = (req, res, next) => {
    res.send("GET Recipies");
};

// @desc Post new recipie
// @route POST /api/v1/recipies
// @access Public
exports.addRecipie = (req, res, next) => {
    res.send("POST Recipie");
};

// @desc Delete recipies
// @route DELETE /api/v1/recipies:id
// @access Public
exports.deleteRecipie = (req, res, next) => {
    res.send("DELETE Recipie");
};
