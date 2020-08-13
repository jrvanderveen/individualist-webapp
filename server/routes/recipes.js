const express = require("express");
const { ensureAuthenticated } = require("../controlers/auth/auth");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const {
    getRecipes,
    addRecipe,
    addFullRecipe,
    deleteRecipe,
    deleteRecipeIngredient,
    addRecipeIngredient,
    saveEditedRecipe,
    rate,
    uploadRecipeImage,
    updateRecipeDetailsTimes,
    updateRecipeDetailsNotes,
    updateRecipeDetailsInstructions,
} = require("../controlers/recipes");

// /api/recipes
// RECIPE
router.route("/").all(ensureAuthenticated).get(getRecipes);
router.route("/add").all(ensureAuthenticated).get(getRecipes).post(addRecipe);
router.route("/delete").all(ensureAuthenticated).post(deleteRecipe);
router.route("/edit").all(ensureAuthenticated).post(saveEditedRecipe);
router.route("/addFull").all(ensureAuthenticated).post(addFullRecipe);
router.route("/rate").all(ensureAuthenticated).post(rate);
//INGREDIENTS
router.route("/ingredient/delete").all(ensureAuthenticated).post(deleteRecipeIngredient);
router.route("/ingredient/add").all(ensureAuthenticated).post(addRecipeIngredient);
//DETAILS
// router.route("/details").post(getRecipeDetails);
router.route("/details/uploadImage").all(ensureAuthenticated).all(upload.single("file")).post(uploadRecipeImage);
router.route("/details/times").all(ensureAuthenticated).post(updateRecipeDetailsTimes);
router.route("/details/notes").all(ensureAuthenticated).post(updateRecipeDetailsNotes);
router.route("/details/instructions").all(ensureAuthenticated).post(updateRecipeDetailsInstructions);

module.exports = router;
