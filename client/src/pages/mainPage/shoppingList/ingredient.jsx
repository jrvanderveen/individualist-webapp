import React, { useState, useContext } from "react";
import { GlobalContext } from "../../../context/globalState";
import { List, Wrapper } from "../../../elements/index";
import styled from "styled-components";

// Styled Components
const Span = styled.span`
    ${(props) =>
        props.lineThrough === true &&
        `
        color: red;
        text-decoration: line-through;
    `};
`;

/*
    SUMMARY:
        display ingredient and on click make red line through ingredient name

    PARAMS: 
        ingredient: grocery section ingredient name
*/
export const Ingredient = ({ ingredient, index, sectionName }) => {
    // Context
    const { setIngredientLineThrough } = useContext(GlobalContext);

    return (
        <List key={ingredient._id} isShoppingList>
            <Span lineThrough={ingredient.lineThrough ? ingredient.lineThrough : false}>{ingredient.name}</Span>
            <button
                className="float-right btn btn-danger btn-sm"
                onClick={() => setIngredientLineThrough(sectionName, index, ingredient.lineThrough ? !ingredient.lineThrough : true)}
            >
                X
            </button>
        </List>
    );
};
