import React, { useContext } from "react";
import { GlobalContext } from "../../../../context/globalState";
import { List } from "../../../../elements/index";
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
export const Ingredient = ({ ingredient, sectionName, ingredientSetLineThroughFunc }) => {
    // Context
    const { setIngredientLineThrough } = useContext(GlobalContext);

    const handleLineThroughClick = () => {
        setIngredientLineThrough(sectionName, ingredient._id, ingredient.lineThrough ? !ingredient.lineThrough : true).then(() => {
            ingredientSetLineThroughFunc();
        });
    };

    return (
        <List key={ingredient._id} isShoppingList>
            <Span lineThrough={ingredient.lineThrough ? ingredient.lineThrough : false}>{ingredient.name}</Span>
            <button className="float-right btn btn-danger btn-sm" onClick={handleLineThroughClick}>
                X
            </button>
        </List>
    );
};
