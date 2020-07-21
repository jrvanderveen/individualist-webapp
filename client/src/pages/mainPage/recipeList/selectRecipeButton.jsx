import React, { useContext } from "react";
import { GlobalContext } from "../../../context/globalState";
import styled from "styled-components";

// Styled Components
const CheckMarkStyle = styled.svg`
    width: 24px;
    height: 24px;
    fill: ${(props) => (props.active === true ? "green" : "black")};
`;

const CheckMarkButton = styled.button`
    opacity: ${(props) => (props.available === true ? 1 : 0)};

    transition: opacity 0.3s ease;
    border: none;

    background: none;

    @media (min-width: 1000px) {
        position: relative;
        top: 0px;
        left: 0px;
        transform: translate(-100%, 250%);
    }
`;

/*
    SUMMARY:
        Display clickable check mark next to recipe. 
        On click set the addToShoppingList bool on recipe

    PARAMS: 
        active: is recipe selected
        recipe_id: recipe._id

*/

export const SelectRecipeButton = ({ active, recipe_id }) => {
    // State
    const { creatingShoppingList, addRecipeToShoppingList } = useContext(GlobalContext);

    //
    return (
        <CheckMarkButton available={creatingShoppingList} onClick={() => addRecipeToShoppingList(recipe_id)}>
            <CheckMarkStyle xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" active={active}>
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
            </CheckMarkStyle>
        </CheckMarkButton>
    );
};
