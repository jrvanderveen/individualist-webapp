const express = require("express");
const { ensureAuthenticated } = require("../config/auth");
const router = express.Router();
const { getGrocerySections, addGrocerySection, deleteGrocerySection, setDefaultGrocerySection } = require("../controlers/Settings");

// Preserve this order
router.route("/grocerySections").all(ensureAuthenticated).get(getGrocerySections);
router.route("/grocerySections/default/:_id/:section_name").all(ensureAuthenticated).post(setDefaultGrocerySection);
router.route("/grocerySections/:_id/:section_name/:default").all(ensureAuthenticated).post(deleteGrocerySection);
router.route("/grocerySections/:_id/:section_name").all(ensureAuthenticated).post(addGrocerySection);

module.exports = router;
