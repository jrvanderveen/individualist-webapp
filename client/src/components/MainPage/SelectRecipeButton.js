import React, { useContext } from "react";
import styled from "styled-components";
import { CheckMarkButton } from "../../elements/index";
import { GlobalContext } from "../../context/GlobalState";

const CheckMarkStyle = styled.svg`
    width: 24px;
    height: 24px;
    fill: ${(props) => (props.active === true ? "green" : "black")};
`;

export const SelectRecipeButton = ({ active, recipe_id }) => {
    const { creatingShoppingList } = useContext(GlobalContext);
    const { setRecipeForShoppingList } = useContext(GlobalContext);
    return (
        <CheckMarkButton available={creatingShoppingList} onClick={() => setRecipeForShoppingList(recipe_id)}>
            <CheckMarkStyle xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" active={active}>
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
            </CheckMarkStyle>
        </CheckMarkButton>
    );
};
