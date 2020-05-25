import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { List, Input, Button, Wrapper } from "../elements/index";
import { Ingredient } from "./Ingredient";
import { DropDownButton } from "./DropDownButton";
import styled from "styled-components";

const Form = styled.form`
    display: flex;
    flex-flow: row wrap;
    width: 100%;
`;

const Div = styled.div`
    width: 100%;
`;

export const Ingredients = ({ recipe, setHeightState, currContent }) => {
    // State
    const [grocerySection, setGrocerySection] = useState("Other");
    const [ingredient, setIngredient] = useState("");
    // Reducers
    const { addRecipeIngredient } = useContext(GlobalContext);
    // functions

    const onSubmit = (e) => {
        e.preventDefault();
        var newIgredient = {
            name: ingredient,
            grocerySection: grocerySection,
        };
        addRecipeIngredient(recipe._id, newIgredient);
        setIngredient("");
        setHeightState(`${currContent.scrollHeight + currContent.scrollHeight / (recipe.ingredients.length + 1)}px`);
    };

    return (
        <ul>
            {recipe.ingredients.map((ingredient, index) => {
                return <Ingredient key={index} recipeId={recipe._id} ingredient={ingredient} index={index + 1} />;
            })}
            <List isIngredient className="New Ingredient List">
                <Form onSubmit={onSubmit}>
                    <Div>
                        <Input
                            isIngredient
                            value={ingredient}
                            onChange={(e) => setIngredient(e.target.value)}
                            placeholder="Enter Ingredient..."
                            required="required"
                        />
                        <Wrapper grocerySection className="Grocery Section DropDown Wrapper">
                            <DropDownButton default="Other" handleChange={setGrocerySection} />
                        </Wrapper>
                    </Div>
                    <Div>
                        <Button type="submit" ingredient>
                            Save
                        </Button>
                    </Div>
                </Form>
            </List>
        </ul>
    );
};
