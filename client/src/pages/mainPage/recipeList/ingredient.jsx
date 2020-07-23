import React, { useContext } from "react";
import { GlobalContext } from "../../../context/globalState";
import { DropDownButton } from "../../../components/util/dropDownButton";
import { List, Wrapper } from "../../../elements/index";
import styled from "styled-components";

// Styled Components
const SectionDiv = styled.div`
    margin-left: 10px;
    float: right;
    max-width: 33%;
`;

const IngredientLabel = styled.div`
    float: left;
    flex-grow: 1;
`;

const IngredientAtributeWrapper = styled.div`
    display: flex;
    width: 100%;
`;

const DeleteButtonWrapper = styled.div`
    cursor: pointer;
    position: absolute;

    @media (min-width: 1200px) {
        opacity: 0;
        transition: opacity 0.3s ease;
        ${Wrapper}:hover & {
            opacity: 1;
        }

        top: 0px;
        right: 0px;
        transform: translate(100%, 40%);
    }
    @media (max-width: 1199px) {
        top: 0px;
        left: 0px;
        opacity: 1;
        transform: translate(-100%, 40%);
    }
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
export const Ingredient = ({ recipeId, ingredient, index, recipeObj, setRecipeObjFunc }) => {
    // Context
    const { deleteRecipeIngredient, grocerySections } = useContext(GlobalContext);

    // Functions
    // Delete ingredient from recipe and update accordion content max-height
    const handleOnClick = () => {
        deleteRecipeIngredient(recipeId, ingredient);
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
                    // <DeleteButtonWrapper isIngredient onClick={handleOnClick} wrapper={Wrapper}>
                    //     x
                    // </DeleteButtonWrapper>
                    <DeleteButtonWrapper isIngredient wrapper={Wrapper}>
                        <button className="float-right btn btn-danger btn-sm" onClick={handleOnClick}>
                            &times;
                        </button>
                    </DeleteButtonWrapper>
                )}
                {recipeObj.active ? (
                    <IngredientAtributeWrapper>
                        <IngredientLabel>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Ingredient..."
                                value={recipeObj.editRecipe.ingredients[index].name || ""}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </IngredientLabel>
                        <SectionDiv>
                            <DropDownButton
                                defaultSection={ingredient.grocerySection}
                                sections={grocerySections.sections}
                                recipeObj={recipeObj}
                                setRecipeObjFunc={setRecipeObjFunc}
                                index={index}
                            />
                        </SectionDiv>
                    </IngredientAtributeWrapper>
                ) : (
                    <IngredientAtributeWrapper>
                        <IngredientLabel>
                            {index + 1}:&nbsp;&nbsp;{ingredient.name}
                        </IngredientLabel>
                        <SectionDiv>
                            <button type="button" className="btn btn-sm btn-info">
                                {ingredient.grocerySection}
                            </button>
                        </SectionDiv>
                    </IngredientAtributeWrapper>
                )}
            </List>
        </Wrapper>

        // <Wrapper>
        //     <List isIngredient>
        //         {recipeObj.active ? null : (
        //             <DeleteButton isIngredient onClick={handleOnClick} wrapper={Wrapper}>
        //                 x
        //             </DeleteButton>
        //         )}
        //         {recipeObj.active ? (
        //             <>
        //                 <div className="input-group">
        //                     <input
        //                         type="text"
        //                         className="form-control"
        //                         placeholder="Enter Ingredient..."
        //                         value={recipeObj.editRecipe.ingredients[index].name || ""}
        //                         onChange={(e) => handleInputChange(e)}
        //                     />

        //                     <div className="input-group-append">
        //                         <SectionDiv>
        //                             <DropDownButton
        //                                 defaultSection={ingredient.grocerySection}
        //                                 sections={grocerySections.sections}
        //                                 recipeObj={recipeObj}
        //                                 setRecipeObjFunc={setRecipeObjFunc}
        //                                 index={index}
        //                             />
        //                         </SectionDiv>
        //                     </div>
        //                 </div>
        //             </>
        //         ) : (
        //             <>
        //                 {index + 1}:&nbsp;&nbsp;<IngredientLabel>{ingredient.name}</IngredientLabel>
        //                 <SectionDiv>
        //                     <button type="button" className="btn btn-info" disabled>
        //                         {ingredient.grocerySection}
        //                     </button>
        //                 </SectionDiv>
        //             </>
        //         )}
        //     </List>
        // </Wrapper>
    );
};
