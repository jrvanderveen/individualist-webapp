const express = require("express");
const router = express.Router();
const { getGrocerySections, addGrocerySection, deleteGrocerySection, setDefaultGrocerySection } = require("../controlers/Settings");

// Preserve this order
router.route("/grocerySections").get(getGrocerySections);
router.route("/grocerySections/default/:_id/:section_name").post(setDefaultGrocerySection);
router.route("/grocerySections/:_id/:section_name/:default").post(deleteGrocerySection);
router.route("/grocerySections/:_id/:section_name").post(addGrocerySection);

module.exports = router;
