const ObjectID = require("mongoose").Types.ObjectId;
const os = require("os");
const ShoppingList = require("../models/ShoppingList");

// @desc Get shopping list
// @route GET /api/v1/shoppingList/download
// @access Public
exports.getShoppingList = async (req, res, next) => {
    try {
        let shoppingList = await ShoppingList.find();

        if (shoppingList.length === 0) {
            shoppingList = await ShoppingList.create({});
        } else {
            shoppingList = shoppingList[0];
        }

        return res.status(200).json({
            success: true,
            data: shoppingList,
        });
    } catch (err) {
        console.log(`${err}`.red);
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};

// @desc Post add ingredients from recipe to shopping list
// @route POST /api/v1/shoppingList
// @access Public
exports.postNewShoppingList = async (req, res, next) => {
    try {
        // if id is passed in then replace otherwise create
        let shoppingList;
        console.log(req.body);
        shoppingList = await ShoppingList.replaceOne({ _id: req.body._id }, req.body, { upsert: true });

        return res.status(201).json({
            success: true,
            data: shoppingList,
        });
    } catch (err) {
        console.log(`${err}`.red);
        if (err.name === "ValidationError") {
            const messages = Object.values(err.errors).map((val) => val.message);
            return res.status(400).json({
                success: false,
                error: messages,
            });
        } else {
            return res.status(500).json({
                success: false,
                error: "Server Error",
            });
        }
    }
};

// @desc Add section ingredient
// @route POST /api/v1/shoppingList
// @access Public
exports.addSectionIngredient = async (req, res, next) => {
    let { _id, sectionName, ingredient } = req.body;
    let ingredientObj = { _id: ObjectID(), name: ingredient };
    try {
        const shoppingList = await ShoppingList.findById({ _id: ObjectID(_id) });
        if (!shoppingList) {
            return res.status(404).json({
                success: false,
                error: "No shopping list found",
            });
        }
        let map = shoppingList.grocerySectionIngredientsMap;
        if (!map) {
            map = {};
            map[sectionName] = [];
        } else if (!map[sectionName]) {
            map[sectionName] = [];
        }
        map[sectionName].push(ingredientObj);

        await ShoppingList.updateOne({ _id: ObjectID(_id) }, { $set: { grocerySectionIngredientsMap: map } });

        return res.status(200).json({
            success: true,
            data: {
                ingredient: ingredientObj,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};

// @desc Clear all ingredients from list
// @route DELTE /api/v1/shoppingList
// @access Public
exports.clearShoppingList = async (req, res, next) => {
    let _id = req.params.shopping_list_id;
    try {
        const shoppingList = await ShoppingList.findById({ _id: ObjectID(_id) });
        if (!shoppingList) {
            return res.status(404).json({
                success: false,
                error: "No shopping list found",
            });
        }

        await ShoppingList.updateOne({ _id: ObjectID(_id) }, { $set: { grocerySectionIngredientsMap: {} } });

        return res.status(200).json({
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};

// @desc Return shopping list as attachment
// @route GET /api/v1/shoppingList
// @access Public
exports.createShoppingListFile = (req, res, next) => {
    try {
        const shoppingList = JSON.parse(req.query.grocerySectionIngredientsMap);
        let contentString = "";
        console.log("string", contentString);
        Object.entries(shoppingList).forEach(([section, ingredients]) => {
            contentString = contentString + section + os.EOL;
            ingredients.forEach((ingredient) => {
                contentString = contentString + "\t" + ingredient.name + os.EOL;
            });
        });
        contentString = contentString.substring(0, contentString.length - 8);
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
