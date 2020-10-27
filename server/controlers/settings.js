const GrocerySections = require("../models/grocerySections");
const MealTypes = require("../models/mealTypes");
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
//////////////////////////////////////////////////////////////////////////////////////
// MEAL TYPES
// @desc Get list of meal types
// @route GET /api/settings/mealTypes
// @access Private
exports.getMealTypes = async (req, res, next) => {
    try {
        var mealTypes = await MealTypes.find({ userId: req.user._id });
        if (mealTypes.length === 0) {
            var createStatus = await createDefaultMealTypes(req.user._id);
            if (createStatus.success) {
                mealTypes = [createStatus.mealTypesDoc];
            } else {
                throw new Error(createStatus.error);
            }
        }

        return res.status(200).json({
            success: true,
            count: mealTypes.length,
            data: mealTypes,
        });
    } catch (err) {
        console.log(`${err}`.red);
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};

// Helper method to create default meal type document
const createDefaultMealTypes = async (userId) => {
    try {
        const mealTypeObject = {
            userId: userId,
            default: "Dinner",
            types: ["Breakfast", "Lunch", "Dinner"],
        };
        const mealTypesDoc = await MealTypes.create(mealTypeObject);

        return { success: true, mealTypesDoc: mealTypesDoc };
    } catch (err) {
        console.log(`ERROR: Creating default meal type document: ${err}`.red);
        return {
            success: false,
            error: err,
        };
    }
};

// @desc Add meal Type
// @route POST /api/settings/mealTypes/add
// @access Private
exports.addMealType = async (req, res, next) => {
    try {
        console.log(req.body);
        const mealType = await MealTypes.findOne({ _id: req.body._id, userId: req.user._id });

        if (!mealType) {
            return res.status(404).json({
                success: false,
                error: "No meal types found",
            });
        }
        await MealTypes.updateOne({ _id: req.body._id, userId: req.user._id }, { $push: { types: req.body.mealTypeName } });

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
        const { _id, mealTypeName, defaultMealType } = req.body;
        await Recipe.updateMany(
            { mealType: mealTypeName },
            { $set: { mealType: defaultMealType } },
            {
                multi: true,
            }
        );
        await MealTypes.updateOne({ _id: _id, userId: req.user._id }, { $pull: { types: mealTypeName } });

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
        const mealType = await MealTypes.findOne({ _id: req.body._id, userId: req.user._id });

        if (!mealType) {
            return res.status(404).json({
                success: false,
                error: "No meal type found",
            });
        }
        await MealTypes.updateOne({ _id: req.body._id, userId: req.user._id }, { $set: { default: req.body.typeName } });

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
