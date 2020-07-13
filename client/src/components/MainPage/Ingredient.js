import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { DropDownButton } from "../util/DropDownButton";
import { DeleteButton, List, Input, Wrapper } from "../../elements/index";
import styled from "styled-components";

// Styled Components
const Div = styled.div`
    margin-left: 10px;
`;

const IngredientLabel = styled.div`
    width: 100%;
    overflow: hidden;
`;

/*
    SUMMARY:
        Diplay/edit/delete recipe ingredient 

    PARAMS: 
        recipeId: recipe._id
        ingredient: specific recipe from recipe
        index: index of the ingredient in recipe ingredient list
        handleDeleteIngredient: function to update accordion content height of ingredients
        setRecipeObjFunc: update recipeObj
        recipeObj: {active: true/false, recipe: {recipe object}, editRecipe: {copy of recipe object used for editing}}

*/
export const Ingredient = ({ recipeId, ingredient, index, handleDeleteIngredient, recipeObj, setRecipeObjFunc }) => {
    // Context
    const { deleteRecipeIngredient, grocerySections } = useContext(GlobalContext);

    // Functions
    // Delete ingredient from recipe and update accordion content max-height
    const handleOnClick = () => {
        deleteRecipeIngredient(recipeId, ingredient);
        handleDeleteIngredient();
    };

    // While editing is active update editRecipe obj ingredient name for index
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

    // Recipe ingredient
    // If in eding mode display editRecipe values
    return (
        <Wrapper>
            <List isIngredient>
                {recipeObj.active ? null : (
                    <DeleteButton isIngredient onClick={handleOnClick} wrapper={Wrapper}>
                        x
                    </DeleteButton>
                )}
                {recipeObj.active ? (
                    <>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Ingredient..."
                                value={recipeObj.editRecipe.ingredients[index].name || ""}
                                onChange={(e) => handleInputChange(e)}
                            />

                            <div className="input-group-append">
                                <Div>
                                    <DropDownButton
                                        defaultSection={ingredient.grocerySection}
                                        sections={grocerySections.sections}
                                        recipeObj={recipeObj}
                                        setRecipeObjFunc={setRecipeObjFunc}
                                        index={index}
                                    />
                                </Div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {index + 1}:&nbsp;&nbsp;<IngredientLabel>{ingredient.name}</IngredientLabel>
                        <Div>
                            <button type="button" className="btn btn-info" disabled>
                                {ingredient.grocerySection}
                            </button>
                        </Div>
                    </>
                )}
            </List>
        </Wrapper>
        // <Wrapper>
        //     <List isIngredient>
        //         {recipeObj.active ? null : (
        //             <DeleteButton isIngredient onClick={handleOnClick}>
        //                 x
        //             </DeleteButton>
        //         )}
        //         {recipeObj.active ? (
        //             <>
        //                 <Input
        //                     isRecipeIngredient
        //                     type="text"
        //                     placeholder="Enter Ingredient..."
        //                     value={recipeObj.editRecipe.ingredients[index].name || ""}
        //                     onChange={(e) => handleInputChange(e)}
        //                 />
        //                 <Div>
        //                     <DropDownButton
        //                         defaultSection={ingredient.grocerySection}
        //                         sections={grocerySections.sections}
        //                         recipeObj={recipeObj}
        //                         setRecipeObjFunc={setRecipeObjFunc}
        //                         index={index}
        //                     />
        //                 </Div>
        //             </>
        //         ) : (
        //             <>
        //                 {index + 1}:&nbsp;&nbsp;<IngredientLabel>{ingredient.name}</IngredientLabel>
        //                 <Div>
        //                     <button type="button" className="btn btn-info" disabled>
        //                         {ingredient.grocerySection}
        //                     </button>
        //                 </Div>
        //             </>
        //         )}
        //     </List>
        // </Wrapper>
    );
};
