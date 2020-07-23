const ObjectID = require("mongoose").Types.ObjectId;
const os = require("os");
const ShoppingList = require("../models/shoppingList");

// @desc Get shopping list
// @route GET /api/v1.1/shoppingList/download
// @access Private
exports.getShoppingList = async (req, res, next) => {
    try {
        let shoppingList = await ShoppingList.find({ userId: req.user._id });

        if (shoppingList.length === 0) {
            shoppingList = await ShoppingList.create({ userId: req.user._id });
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
// @route POST /api/v1.1/shoppingList
// @access Private
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
// @route POST /api/v1.1/shoppingList
// @access Private
exports.addSectionIngredient = async (req, res, next) => {
    let { _id, sectionName, ingredientObj } = req.body;
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
// @route DELTE /api/v1.1/shoppingList
// @access Private
exports.clearShoppingList = async (req, res, next) => {
    let _id = req.body._id;
    try {
        let shoppingList = await ShoppingList.findById({ _id: ObjectID(_id) });
        if (!shoppingList) {
            return res.status(404).json({
                success: false,
                error: "No shopping list found",
            });
        }
        const grocerySectionIngredientsMap = {};
        Object.keys(shoppingList.grocerySectionIngredientsMap).forEach((key) => {
            grocerySectionIngredientsMap[key] = [];
        });

        await ShoppingList.updateOne({ _id: ObjectID(_id) }, { $set: { grocerySectionIngredientsMap: grocerySectionIngredientsMap } });

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
// @route GET /api/v1.1/shoppingList
// @access Private
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

// @desc Update section ingredient to set or unset lineTrhough
// @route post /api/v1.1/shoppingList/lineThrough
// @access Private
exports.setIngredientLineThrough = (req, res, next) => {
    let { _id, sectionName, index, value } = req.body;
    const updateString = `grocerySectionIngredientsMap.${sectionName}.${index}.lineThrough`;
    console.log(updateString, _id, sectionName, index, value);
    try {
        ShoppingList.updateOne({ _id: ObjectID(_id) }, { $set: { [updateString]: value } }).then(() => {
            return res.status(200).json({
                success: true,
            });
        });
    } catch (err) {
        console.log(`${err}`.red);
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};
