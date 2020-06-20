const Recipe = require("../models/recipe");
const ObjectID = require("mongoose").Types.ObjectId;

// @desc Get all recipes
// @route GET /api/v1/recipes
// @access Public
exports.getRecipes = async (req, res, next) => {
    try {
        const recipes = await Recipe.find();
        return res.status(200).json({
            success: true,
            count: recipes.length,
            data: recipes,
        });
    } catch (err) {
        console.log(`${err}`.red);
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};
// @desc Post new recipe
// @route POST /api/v1/recipes
// @access Public
// req.body = {name, servings, URL} no ingredients on create
exports.addRecipe = async (req, res, next) => {
    try {
        const recipe = await Recipe.create(req.body);

        return res.status(201).json({
            success: true,
            data: recipe,
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

// @desc Delete recipe for given _id
// @route DELETE /api/v1/recipes:id
// @access Public
exports.deleteRecipe = async (req, res, next) => {
    try {
        const recipe = await Recipe.findById(req.params._id);
        if (!recipe) {
            return res.status(404).json({
                success: false,
                error: "No recipe found",
            });
        }
        await recipe.remove();

        return res.status(200).json({
            success: true,
            data: {},
        });
    } catch {
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};

// @desc Delete recipe ingredient
// @route DELETE /api/v1/recipes/:recipe_id/:ingredient_id
// @access Public
exports.deleteRecipeIngredient = async (req, res, next) => {
    try {
        await Recipe.updateOne({ _id: req.params.recipe_id }, { $pull: { ingredients: { _id: req.params.ingredient_id } } });
        return res.status(200).json({
            success: true,
            data: {},
        });
    } catch {
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};

// @desc Add recipe ingredient
// @route POST /api/v1/:_id
// @access Public
exports.addRecipeIngredient = async (req, res, next) => {
    try {
        const recipe = await Recipe.findById(req.params._id);

        if (!recipe) {
            return res.status(404).json({
                success: false,
                error: "No recipe found",
            });
        }
        ingredient = req.body;
        // ingredient._id = ObjectID();
        await Recipe.updateOne({ _id: req.params._id }, { $push: { ingredients: ingredient } });

        return res.status(200).json({
            success: true,
            data: {
                ingredient: ingredient,
                recipe: req.params._id,
            },
        });
    } catch {
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};

// @desc Edit recipe
// @route POST /api/v1/recipes/edit
// @access Public
exports.saveEditedRecipe = async (req, res, next) => {
    try {
        await Recipe.replaceOne({ _id: req.body._id }, req.body, { upsert: true });

        return res.status(200).json({
            success: true,
        });
    } catch {
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};
