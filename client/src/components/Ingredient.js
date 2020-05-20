import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { DeleteButton, List, Wrapper } from "../elements/index";

export const Ingredient = ({ recipeId, ingredient, index }) => {
    // State
    const [grocerySection, setGrocerySection] = useState("Other");
    // Reducers
    const { deleteRecipeIngredient } = useContext(GlobalContext);
    // functions

    return (
        <Wrapper>
            <List isIngredient>
                <DeleteButton isIngredient onClick={() => deleteRecipeIngredient(recipeId, ingredient)}>
                    x
                </DeleteButton>
                {index} : {ingredient}
                <DropdownButton id={`dropdown-button-drop`} size="sm" variant="secondary" title={grocerySection}>
                    <Dropdown.Item onClick={(e) => setGrocerySection(e.target.text)} eventKey="1">
                        Produce
                    </Dropdown.Item>
                    <Dropdown.Item onClick={(e) => setGrocerySection(e.target.text)} eventKey="2">
                        Poultry
                    </Dropdown.Item>
                    <Dropdown.Item onClick={(e) => setGrocerySection(e.target.text)} eventKey="3">
                        Other
                    </Dropdown.Item>
                </DropdownButton>
            </List>
        </Wrapper>
    );
};
