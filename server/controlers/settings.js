const GrocerySections = require("../models/grocerySections");
const User = require("../models/user");
const Recipe = require("../models/recipe");
const ShoppingList = require("../models/shoppingList");
const os = require("os");
const mongoose = require("mongoose");

//////////////////////////////////////////////////////////////////////////////////////
// GROCERY SECTIONS
// @desc Get list of grocery sections
// @route GET /api/settings/grocerySections
// @access Private
exports.getGrocerySections = async (req, res, next) => {
    try {
        var grocerySections = await GrocerySections.find({ userId: req.user._id });
        if (grocerySections.length === 0) {
            var createStatus = await createDefaultGrocerySections(req.user._id);
            if (createStatus.success) {
                grocerySections = [createStatus.grocerySectionsDoc];
            } else {
                throw new Error(createStatus.error);
            }
        }

        return res.status(200).json({
            success: true,
            count: grocerySections.length,
            data: grocerySections,
        });
    } catch (err) {
        console.log(`${err}`.red);
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};

// Helper method to create default grocery section document
const createDefaultGrocerySections = async (userId) => {
    try {
        const grocerySectionObject = {
            userId: userId,
            default: "Other",
            sections: ["Other", "Produce", "Meat"],
        };
        const grocerySectionsDoc = await GrocerySections.create(grocerySectionObject);

        return { success: true, grocerySectionsDoc: grocerySectionsDoc };
    } catch (err) {
        console.log(`ERROR: Creating default grocery section document: ${err}`.red);
        return {
            success: false,
            error: err,
        };
    }
};

// @desc Add grocery Section
// @route POST /api/settings/grocerySections/_id/section_name
// @access Private
exports.addGrocerySection = async (req, res, next) => {
    try {
        const grocerySection = await GrocerySections.findOne({ _id: req.body._id, userId: req.user._id });

        if (!grocerySection) {
            return res.status(404).json({
                success: false,
                error: "No grocery section found",
            });
        }
        await GrocerySections.updateOne({ _id: req.body._id, userId: req.user._id }, { $push: { sections: req.body.sectionName } });

        return res.status(200).json({
            success: true,
        });
    } catch (err) {
        console.log(`${err}`.red);
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};

// @desc Delete grocery section
// @route DELETE /api/settings/grocerySections/_id/section_name
// @access Private
exports.deleteGrocerySection = async (req, res, next) => {
    try {
        const { _id, sectionName, defaultSection, shoppingList } = req.body;

        await Recipe.updateMany(
            {},
            { $set: { "ingredients.$[ingredient].grocerySection": defaultSection } },
            {
                multi: true,
                arrayFilters: [{ "ingredient.grocerySection": sectionName }],
            }
        );
        await ShoppingList.replaceOne({ _id: shoppingList._id, userId: req.user._id }, shoppingList, { upsert: true });
        await GrocerySections.updateOne({ _id: _id, userId: req.user._id }, { $pull: { sections: sectionName } });

        return res.status(200).json({
            success: true,
            data: {},
        });
    } catch (err) {
        console.log(`${err}`.red);
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};

// @desc Set default grocery section
// @route POST /api/settings/grocerySections/default
// @access Private
exports.setDefaultGrocerySection = async (req, res, next) => {
    try {
        const grocerySection = await GrocerySections.findOne({ _id: req.body._id, userId: req.user._id });

        if (!grocerySection) {
            return res.status(404).json({
                success: false,
                error: "No grocery sections found",
            });
        }
        await GrocerySections.updateOne({ _id: req.body._id, userId: req.user._id }, { $set: { default: req.body.sectionName } });

        return res.status(200).json({
            success: true,
        });
    } catch (err) {
        console.log(`${err}`.red);
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};

// @desc Add meal Type
// @route POST /api/settings/mealTypes/add
// @access Private
exports.addMealType = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.user._id });

        if (!user["mealTypes"] || !user["mealTypes"]["types"]) {
            return res.status(404).json({
                success: false,
                error: "No meal types found",
            });
        }
        user["mealTypes"]["types"].push(req.body.mealTypeName);
        await User.updateOne({ _id: req.user._id }, { $set: user });

        return res.status(200).json({
            success: true,
        });
    } catch (err) {
        console.log(`${err}`.red);
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};

// @desc Delete meal type
// @route DELETE /api/settings/mealTypes/delete
// @access Private
exports.deleteMealType = async (req, res, next) => {
    try {
        const { mealTypeName, defaultMealType } = req.body;
        await Recipe.updateMany(
            { mealType: mealTypeName },
            { $set: { mealType: defaultMealType } },
            {
                multi: true,
            }
        );

        const user = await User.findOne({ _id: req.user._id });

        if (!user["mealTypes"] || !user["mealTypes"]["types"]) {
            return res.status(404).json({
                success: false,
                error: "No meal types found",
            });
        }
        user["mealTypes"]["types"].pull(req.body.mealTypeName);
        await User.updateOne({ _id: req.user._id }, { $set: user });

        return res.status(200).json({
            success: true,
            data: {},
        });
    } catch (err) {
        console.log(`${err}`.red);
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};

// @desc Set default meal type
// @route POST /api/settings/mealTypes/default
// @access Private
exports.setDefaultMealType = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.user._id });

        if (!user["mealTypes"]) {
            return res.status(404).json({
                success: false,
                error: "No meal types found",
            });
        }

        user.mealTypes.default = req.body.mealTypeName;
        await User.updateOne({ _id: req.user._id }, { $set: user });

        return res.status(200).json({
            success: true,
        });
    } catch (err) {
        console.log(`${err}`.red);
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};
