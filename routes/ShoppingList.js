const express = require("express");
const router = express.Router();
const { createShoppingListFile, getShoppingList, postNewShoppingList, addSectionIngredient, clearShoppingList } = require("../controlers/ShoppingList");

// Preserve this order
router.route("/download").get(createShoppingListFile);
router.route("/update").post(addSectionIngredient);
router.route("/:shopping_list_id").delete(clearShoppingList);
router.route("/").get(getShoppingList).post(postNewShoppingList);

module.exports = router;
