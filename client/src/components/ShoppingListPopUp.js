import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import styled from "styled-components";

const ShoppingListDiv = styled.div`
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.25);
`;

const ShoppingListContent = styled.div`
    background-color: white;
    position: absolute;
    top: 20%;
    left: 30%;
    width: 40%;
    padding: 20px;
    border-radius: 5px;
    border: 2px solid black;
`;
export const ShoppingListPopUp = ({ togglePopUpFunc }) => {
    // Reducers
    const { returnSelectedRecipes } = useContext(GlobalContext);
    const grocerySectionList = ["Produce", "Meat/Seafood", "Deli/Prepared", "Other"];

    const recipeList = returnSelectedRecipes();

    const handleClick = () => {
        togglePopUpFunc();
    };

    const grocerSections = () => {
        var sectionList = [];
        grocerySectionList.forEach((section) => {
            var sectionIngredients = [];
            recipeList[section].forEach((ingredient) => {
                sectionIngredients.push(<li key={ingredient}>{ingredient}</li>);
            });
            if (sectionIngredients.length > 0) {
                sectionList.push(
                    <li key={section}>
                        {section}
                        <ul>{sectionIngredients}</ul>
                    </li>
                );
            } else {
                sectionList.push(<li key={section}>{section}</li>);
            }
        });
        return sectionList;
    };

    return (
        <ShoppingListDiv>
            <ShoppingListContent>
                <span className="close" onClick={handleClick}>
                    &times;
                </span>
                <ul>{grocerSections()}</ul>
            </ShoppingListContent>
        </ShoppingListDiv>
    );
};
