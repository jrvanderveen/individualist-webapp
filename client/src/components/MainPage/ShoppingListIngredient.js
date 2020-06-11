import React, { useState } from "react";
import styled from "styled-components";
import { List, Wrapper } from "../../elements/index";

const Span = styled.span`
    ${(props) =>
        props.lineThrough === true &&
        `
        color: red;
        text-decoration: line-through;
    `};
`;

export const ShoppingListIngredient = (props) => {
    const [active, setActive] = useState(false);

    return (
        <List key={props.ingredient} isShoppingList>
            <Span lineThrough={active}>
                <Wrapper>{props.ingredient}</Wrapper>
            </Span>
            <button className="float-right btn btn-danger btn-sm" onClick={() => setActive(!active)}>
                X
            </button>
        </List>
    );
};
