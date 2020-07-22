const express = require("express");
const { ensureAuthenticated } = require("../controlers/auth/auth");
const router = express.Router();
const { getRecipes, addRecipe, addFullRecipe, deleteRecipe, deleteRecipeIngredient, addRecipeIngredient, saveEditedRecipe } = require("../controlers/recipes");

//RECIPE
router.route("/").all(ensureAuthenticated).get(getRecipes);
router.route("/add").all(ensureAuthenticated).get(getRecipes).post(addRecipe);
router.route("/delete").all(ensureAuthenticated).post(deleteRecipe);
router.route("/edit").all(ensureAuthenticated).post(saveEditedRecipe);
router.route("/addFull").all(ensureAuthenticated).post(addFullRecipe);
//INGREDIENTS
router.route("/ingredient/delete").all(ensureAuthenticated).post(deleteRecipeIngredient);
router.route("/ingredient/add").all(ensureAuthenticated).post(addRecipeIngredient);
module.exports = router;
