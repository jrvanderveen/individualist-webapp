import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";

import { DropDownButton } from "../util/DropDownButton";
import { DeleteButton, List, Wrapper, Input } from "../../elements/index";
import styled from "styled-components";

const Div = styled.div`
    margin-left: 10px;
`;

export const Ingredient = ({ recipeId, ingredient, index, handleDeleteIngredient, recipeObj, setRecipeObjFunc }) => {
    // Reducers
    const { deleteRecipeIngredient, grocerySections } = useContext(GlobalContext);
    // functions
    const handleOnClick = () => {
        deleteRecipeIngredient(recipeId, ingredient);
        handleDeleteIngredient();
    };
    const handleInputChange = (e) => {
        setRecipeObjFunc({
            ...recipeObj,
            editRecipe: {
                ...recipeObj.editRecipe,
                ingredients: [
                    ...recipeObj.editRecipe.ingredients.slice(0, index),
                    { ...recipeObj.editRecipe.ingredients[index], name: e.target.value },
                    ...recipeObj.editRecipe.ingredients.slice(index + 1),
                ],
            },
        });
    };

    return (
        <Wrapper>
            <List isIngredient>
                {recipeObj.active ? null : (
                    <DeleteButton isIngredient onClick={handleOnClick}>
                        x
                    </DeleteButton>
                )}
                {recipeObj.active ? (
                    <Input
                        isRecipeIngredient
                        type="text"
                        placeholder="Enter Ingredient..."
                        value={recipeObj.editRecipe.ingredients[index].name || ""}
                        onChange={(e) => handleInputChange(e)}
                    />
                ) : (
                    `${index + 1}: ${ingredient.name}`
                )}
                <Div>
                    <DropDownButton
                        defaultSection={ingredient.grocerySection}
                        sections={grocerySections.sections}
                        recipeObj={recipeObj}
                        setRecipeObjFunc={setRecipeObjFunc}
                        index={index}
                    />
                </Div>
            </List>
        </Wrapper>
    );
};
