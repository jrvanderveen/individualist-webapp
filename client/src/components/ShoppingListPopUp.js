import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import styled from "styled-components";
import { Wrapper } from "../elements/index";
import { ShoppingListIngredient } from "./ShoppingListIngredient";

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
    top: 10%;
    left: 30%;
    width: 40%;
    max-height: 80%;
    padding: 20px;
    border-radius: 5px;
    border: 2px solid black;
    overflow-y: scroll;
`;

const Button = styled.button`
    float: right;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    opacity: 0.5;
    background-color: Transparent;
    border: none;
    outline: none;
`;

const H6 = styled.h6`
    margin: 10px;
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
                sectionIngredients.push(<ShoppingListIngredient key={ingredient} ingredient={ingredient} />);
            });
            if (sectionIngredients.length > 0) {
                sectionList.push(
                    <Wrapper key={section}>
                        <H6>{section}</H6>
                        <ul>{sectionIngredients}</ul>
                    </Wrapper>
                );
            } else {
                sectionList.push(<H6 key={section}>{section}</H6>);
            }
        });
        return sectionList;
    };

    return (
        <ShoppingListDiv>
            <ShoppingListContent>
                <Button onClick={handleClick}>&times;</Button>
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-12">
                                <h3>Shopping List</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <ul className="list-group">{grocerSections()}</ul>
                            </div>
                        </div>
                    </div>
                </div>
            </ShoppingListContent>
        </ShoppingListDiv>
    );
};
