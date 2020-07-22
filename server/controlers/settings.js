const GrocerySections = require("../models/grocerySections");
const Recipe = require("../models/recipe");
const ShoppingList = require("../models/shoppingList");
const os = require("os");
const mongoose = require("mongoose");

// @desc Get list of grocery sections
// @route GET /api/v1.1/settings/grocerySections
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
        console.log(`ERROR: Creating default grocery section document`.red);
        return {
            success: false,
            error: err,
        };
    }
};

// @desc Add grocery Section
// @route POST /api/v1.1/settings/grocerySections/_id/section_name
// @access Private
exports.addGrocerySection = async (req, res, next) => {
    try {
        const grocerySection = await GrocerySections.findById(req.body._id);

        if (!grocerySection) {
            return res.status(404).json({
                success: false,
                error: "No grocery section found",
            });
        }
        await GrocerySections.updateOne({ _id: req.body._id }, { $push: { sections: req.body.sectionName } });

        return res.status(200).json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};

// @desc Delete grocery section
// @route DELETE /api/v1.1/settings/grocerySections/_id/section_name
// @access Private
exports.deleteGrocerySection = async (req, res, next) => {
    try {
        const { _id, sectionName, defaultSection, shoppingList } = req.body;
        console.log(_id, sectionName, defaultSection, shoppingList);
        await GrocerySections.updateOne({ _id: _id }, { $pull: { sections: sectionName } });

        await Recipe.updateMany(
            {},
            { $set: { "ingredients.$[ingredient].grocerySection": defaultSection } },
            {
                multi: true,
                arrayFilters: [{ "ingredient.grocerySection": sectionName }],
            }
        );
        await ShoppingList.replaceOne({ _id: shoppingList._id }, shoppingList, { upsert: true });

        return res.status(200).json({
            success: true,
            data: {},
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};

// @desc Set default grocery section
// @route POST /api/v1.1/settings/grocerySections/default
// @access Private
exports.setDefaultGrocerySection = async (req, res, next) => {
    console.log(req.body);
    try {
        const grocerySection = await GrocerySections.findById(req.body._id);

        if (!grocerySection) {
            return res.status(404).json({
                success: false,
                error: "No grocery section found",
            });
        }
        await GrocerySections.updateOne({ _id: req.body._id }, { $set: { default: req.body.sectionName } });

        return res.status(200).json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};
