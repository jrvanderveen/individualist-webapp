import React, { useContext, useState } from "react";
import { GlobalContext } from "../../../../../context/globalState";
import { Ingredient } from "./ingredient";
import { DropDownButton } from "../../../../../components/util/dropDownButton";
import { List, Button } from "../../../../../elements/index";
import styled from "styled-components";

// Styled Components
const Form = styled.form`
    width: 100%;
`;

const RowDiv = styled.div`
    display: flex;
    width: 100%;
`;

const ColDiv = styled.div`
    float: ${(props) => (props.right ? "right" : props.left ? "left" : "")};
    max-width: ${(props) => (props.right ? "33%" : "")};
    margin-left: ${(props) => (props.right ? "10px" : "")};
    flex-grow: ${(props) => props.left && "1"};
    width: ${(props) => props.full && "100%"};
`;

/*
    SUMMARY:
        Display new ingredient form and map ingredients to ingredient component

    PARAMS: 
        recipeId: recipe._id
        setRecipeObjFunc: update recipeObj
        recipeObj: {active: true/false, recipe: {recipe object}, editRecipe: {copy of recipe object used for editing}}

*/
export const Ingredients = ({ recipeObj, setRecipeObjFunc }) => {
    // Context
    const { addRecipeIngredient, grocerySections } = useContext(GlobalContext);

    // State
    const [newIngredientGrocerySection, setNewIngredientGrocerySection] = useState(grocerySections.default);
    const [newIngredient, setNewIngredient] = useState("");

    // functions
    // On submit new inrgedient add to state reset field
    const onSubmit = (e) => {
        e.preventDefault();

        let newIgredient = {
            name: newIngredient,
            grocerySection: newIngredientGrocerySection,
        };
        addRecipeIngredient(recipeObj.recipe._id, newIgredient);
        setNewIngredient("");
    };

    // Map list of ingredients and display new ingredient form at end of list
    // If in eding mode display editRecipe values
    return (
        <ul>
            {recipeObj.recipe.ingredients.map((ingredient, index) => {
                return (
                    <Ingredient
                        key={index}
                        recipeId={recipeObj.recipe._id}
                        ingredient={ingredient}
                        index={index}
                        recipeObj={recipeObj}
                        setRecipeObjFunc={setRecipeObjFunc}
                    />
                );
            })}
            {recipeObj.active ? null : (
                <List isIngredient isForm>
                    <Form onSubmit={onSubmit}>
                        <RowDiv>
                            <ColDiv left>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={newIngredient}
                                    placeholder="Enter Ingredient..."
                                    required="required"
                                    onChange={(e) => setNewIngredient(e.target.value)}
                                />
                            </ColDiv>
                            <ColDiv right>
                                <DropDownButton
                                    defaultSection={grocerySections.default}
                                    handleChange={setNewIngredientGrocerySection}
                                    sections={grocerySections.sections}
                                    recipeObj={recipeObj}
                                    setRecipeObjFunc={setRecipeObjFunc}
                                />
                            </ColDiv>
                        </RowDiv>
                        <RowDiv>
                            <ColDiv full>
                                <Button type="submit" ingredient>
                                    Save
                                </Button>
                            </ColDiv>
                        </RowDiv>
                    </Form>
                </List>
            )}
        </ul>
    );
};
