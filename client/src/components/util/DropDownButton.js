import React, { useState } from "react";
import DropdownButtonImported from "react-bootstrap/DropdownButton";
import DropdownImported from "react-bootstrap/Dropdown";

export const DropDownButton = ({ defaultSection, handleChange, sections, recipeObj, setRecipeObjFunc, index }) => {
    const [grocerySection, setGrocerySection] = useState(defaultSection);

    const handleChangeLocal = (text) => {
        // Handle change only passed in from the new ingredient form
        // Used to update the parrent states value
        if (handleChange) {
            setGrocerySection(text);
            handleChange(text);
        } else {
            if (recipeObj.active) setGrocerySection(text);
            setRecipeObjFunc({
                ...recipeObj,
                editRecipe: {
                    ...recipeObj.editRecipe,
                    ingredients: [
                        ...recipeObj.editRecipe.ingredients.slice(0, index),
                        { ...recipeObj.editRecipe.ingredients[index], grocerySection: text },
                        ...recipeObj.editRecipe.ingredients.slice(index + 1),
                    ],
                },
            });
        }
    };

    return (
        <DropdownButtonImported className="dropdown-button-drop-right" drop="right" size="sm" variant="info" title={grocerySection}>
            {sections.map((section, index) => (
                <DropdownImported.Item key={index} onClick={(e) => handleChangeLocal(e.target.text)} eventKey={index + 1}>
                    {section}
                </DropdownImported.Item>
            ))}
        </DropdownButtonImported>
    );
};
