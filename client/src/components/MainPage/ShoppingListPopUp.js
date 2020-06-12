import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import styled from "styled-components";
import { Wrapper } from "../../elements/index";
import { ShoppingListIngredient } from "./ShoppingListIngredient";
import { ShoppingListOptions } from "./ShoppingListOptions";
import axios from "axios";

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
    min-width: 450px;
    max-height: 80%;
    padding: 20px;
    border-radius: 5px;
    border: 2px solid black;
    overflow-y: scroll;
`;

const DivRow = styled.div`
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
    width: 100%;
`;

const H6 = styled.h6`
    margin: 10px;
    text-decoration: underline;
`;

export const ShoppingListPopUp = ({ togglePopUpFunc }) => {
    // Reducers
    const { returnSelectedRecipesIngredientMap } = useContext(GlobalContext);
    const grocerySectionList = ["Produce", "Meat/Seafood", "Deli/Prepared", "Other"];

    const recipeList = returnSelectedRecipesIngredientMap();

    async function downloadShoppingList() {
        const errors = [];
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            responseType: "blob",
            params: {
                recipeList: recipeList,
            },
        };

        try {
            await axios.get("/api/v1/shoppingList", config).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "ShoppingList.txt");
                document.body.appendChild(link);
                link.click();
            });
        } catch (error) {
            errors.push(error);
        }
    }

    const grocerSections = () => {
        var sectionList = [];
        grocerySectionList.forEach((section) => {
            var sectionIngredients = [];
            recipeList[section].forEach((ingredient) => {
                sectionIngredients.push(<ShoppingListIngredient key={ingredient._id} ingredient={ingredient.name} />);
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
                <ShoppingListOptions togglePopUpFunc={togglePopUpFunc} downloadShoppingListFunc={downloadShoppingList} />
                <DivRow>
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
                </DivRow>
            </ShoppingListContent>
        </ShoppingListDiv>
    );
};
