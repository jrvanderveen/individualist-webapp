const ObjectID = require("mongoose").Types.ObjectId;
const os = require("os");

// @desc Return shopping list as attachment
// @route GET /api/v1/shoppingList
// @access Public

exports.createShoppingListFile = (req, res, next) => {
    try {
        const shoppingList = JSON.parse(req.query.recipeList);
        let contentString = "";

        Object.entries(shoppingList).forEach(([section, ingredients]) => {
            contentString = contentString + section + os.EOL;
            ingredients.forEach((ingredient) => {
                contentString = contentString + "\t" + ingredient.name + os.EOL;
            });
        });
        res.set({ "Content-Disposition": 'attachment; filename=""' }); //name set client side
        return res.send(contentString);
    } catch (err) {
        console.log(`${err}`.red);
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};
