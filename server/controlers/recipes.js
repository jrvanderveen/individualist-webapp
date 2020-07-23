const Recipe = require("../models/recipe");
const GrocerySections = require("../models/grocerySections");
const axios = require("axios");

// @desc Get all recipes
// @route GET /api/v1.1/recipes
// @access Private
exports.getRecipes = async (req, res, next) => {
    console.log("GET RECIPES".yellow);
    try {
        const recipes = await Recipe.find({ userId: req.user._id });
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
// @route POST /api/v1.1/recipes
// @access Private
// req.body = {name, servings, URL} no ingredients on create
exports.addRecipe = async (req, res, next) => {
    try {
        req.body.userId = req.user._id;
        let recipeObj = req.body;
        let scraperResult = "success";
        if (req.body.URL) {
            let scraperRes = await axios.post(process.env.SCAPER_ENDPOINT + "/api/v1/scraper/recipe", {
                url: req.body.URL,
            });
            if (!scraperRes.data.error) {
                recipeObj = await buildFullRecipe(req.body.name, req.body.servings, req.body.userId, scraperRes.data);
            } else {
                scraperResult = scraperRes.data.error;
            }
        }
        const recipe = await Recipe.create(recipeObj);
        return res.status(201).json({
            success: true,
            scraper: scraperResult,
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

// @desc Recipes created from the individualist webscraper
// @route POST /api/v1.1/recipes/addFull
// @access Private
// req.body = {name, servings, URL, ingredients[]} no ingredients on create
exports.addFullRecipe = async (req, res, next) => {
    console.log("addFullRecipe");
    try {
        recipeObj = await buildFullRecipe(req.body.name ? req.body.name : "Name Me!", req.body.servings ? req.body.servings : 1, req.user._id, scraperRes.data);
        const recipe = await Recipe.create(recipeObj);
        return res.status(201).json({
            success: true,
            data: recipe,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};

// Helper function for add recipe and add full recipe
buildFullRecipe = async (recipeName, recipeServings, userId, data) => {
    //Expecptions cought in parrent function
    const ingredientsObj = [];
    const userSections = await GrocerySections.findOne({ userId: userId });
    data.ingredients.forEach((ingredient) => {
        ingredientsObj.push({ name: ingredient, grocerySection: userSections["default"] });
    });
    const recipeObj = {
        userId: userId,
        name: recipeName,
        servings: recipeServings,
        URL: data.URL ? data.URL : "http://",
        ingredients: ingredientsObj,
    };

    return recipeObj;
};

// @desc Delete recipe for given _id
// @route DELETE /api/v1.1/recipes:id
// @access Private
exports.deleteRecipe = async (req, res, next) => {
    try {
        const recipe = await Recipe.findById(req.body._id);
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
// @route DELETE /api/v1.1/recipes/:recipe_id/:ingredient_id
// @access Private
exports.deleteRecipeIngredient = async (req, res, next) => {
    try {
        await Recipe.updateOne({ _id: req.body.recipeId }, { $pull: { ingredients: { _id: req.body.ingredientId } } });
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
// @route POST /api/v1.1/:_id
// @access Private
exports.addRecipeIngredient = async (req, res, next) => {
    try {
        const recipe = await Recipe.findById(req.body.recipeId);

        if (!recipe) {
            return res.status(404).json({
                success: false,
                error: "No recipe found",
            });
        }
        ingredient = req.body.ingredient;
        await Recipe.updateOne({ _id: req.body.recipeId }, { $push: { ingredients: ingredient } });

        return res.status(200).json({
            success: true,
            data: {
                ingredient: ingredient,
                recipe: req.body.recipeId,
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
// @route POST /api/v1.1/recipes/edit
// @access Private
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
