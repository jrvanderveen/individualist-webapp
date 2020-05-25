import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

import { DropDownButton } from "./DropDownButton";
import { DeleteButton, List, Wrapper } from "../elements/index";

export const Ingredient = ({ recipeId, ingredient, index }) => {
    // Reducers
    const { deleteRecipeIngredient } = useContext(GlobalContext);
    // functions
    return (
        <Wrapper>
            <List isIngredient>
                <DeleteButton isIngredient onClick={() => deleteRecipeIngredient(recipeId, ingredient.name)}>
                    x
                </DeleteButton>
                {index} : {ingredient.name}
                <DropDownButton default={ingredient.grocerySection} />
            </List>
        </Wrapper>
    );
};
