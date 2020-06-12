const express = require("express");
const router = express.Router();
const { getGrocerySections, addGrocerySection, deleteGrocerySection } = require("../controlers/Settings");

router.route("/grocerySections").get(getGrocerySections);
router.route("/grocerySections/:_id/:section_name").post(addGrocerySection).delete(deleteGrocerySection);

module.exports = router;
