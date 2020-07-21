import React, { useState } from "react";
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
export const Ingredient = ({ ingredient }) => {
    // State
    const [active, setActive] = useState(false);

    return (
        <List key={ingredient} isShoppingList>
            <Span lineThrough={active}>{ingredient}</Span>
            <button className="float-right btn btn-danger btn-sm" onClick={() => setActive(!active)}>
                X
            </button>
        </List>
    );
};
