import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";

import { DropDownButton } from "../util/DropDownButton";
import { DeleteButton, List, Wrapper } from "../../elements/index";

export const Ingredient = ({ recipeId, ingredient, index, handleDeleteIngredient }) => {
    // Reducers
    const { deleteRecipeIngredient, grocerySections } = useContext(GlobalContext);
    // functions
    const handleOnClick = () => {
        deleteRecipeIngredient(recipeId, ingredient);
        handleDeleteIngredient();
    };
    return (
        <Wrapper>
            <List isIngredient>
                <DeleteButton isIngredient onClick={handleOnClick}>
                    x
                </DeleteButton>
                {index} : {ingredient.name}
                <DropDownButton default={ingredient.grocerySection} sections={grocerySections.sections} />
            </List>
        </Wrapper>
    );
};
