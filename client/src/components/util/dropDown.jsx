import React, { useState } from "react";
import DropdownButtonImported from "react-bootstrap/DropdownButton";
import DropdownImported from "react-bootstrap/Dropdown";

/*
    SUMMARY:
        Drop down button for grocery sections    

    PARAMS: 
        defaultSection: default grocery store section
        handleChange: pased in from new ingredient form, will update drop down title
        sections: grocery sections for drop down
        setRecipeObjFunc: update recipeObj
        recipeObj: {active: true/false, recipe: {recipe object}, editRecipe: {copy of recipe object used for editing}}
        index: ingredient index
*/

export const DropDownButton = ({ defaultSection, handleChange, sections, recipeObj, setRecipeObjFunc, index }) => {
    // Context
    const [grocerySection, setGrocerySection] = useState(defaultSection);

    // Functions
    // Update new ingredient form if needed.
    // If edditing update the ingredients grocery section in state
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
