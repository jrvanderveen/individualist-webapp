const express = require("express");
const router = express.Router();
const { getRecipes, addRecipe, deleteRecipe, deleteRecipeIngredient } = require("../controlers/recipes");

router.route("/").get(getRecipes).post(addRecipe);

router.route("/:id").delete(deleteRecipe);

router.route("/:recipe_id/:ingredient").delete(deleteRecipeIngredient);

module.exports = router;
