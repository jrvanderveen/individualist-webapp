import React, { useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../../../context/globalState";
import { Options } from "./options";
import { GrocerySection } from "./grocerySection";
import styled from "styled-components";

// Styled components
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
    @media (max-width: 768px) {
        top: 0px;
        left: 0px;
        min-width: 100vw;
        min-height: 100vh;
        padding-bottom: 5vh;
    }
`;
const Ul = styled.ul`
    margin-bottom: 5px;
`;

/*
    SUMMARY:
        Shopping list popup in front of main page.
        Map grocery sections and ingredients to component.
        Display options component.

    PARAMS: 
        togglePopUpFunc: pass through to close shoppinglist popup

*/
export const ShoppingListPopUp = ({ togglePopUpFunc }) => {
    // Context
    const { shoppingList } = useContext(GlobalContext);

    // Variables
    const grocerySectionIngredientsMap = shoppingList.grocerySectionIngredientsMap;

    // Functions

    // Download shopping list in plain text from server
    async function downloadShoppingList() {
        const errors = [];

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            responseType: "blob",
            params: {
                grocerySectionIngredientsMap: grocerySectionIngredientsMap,
            },
        };

        try {
            await axios.get("/api/shoppingList/download", config).then((response) => {
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

    //
    return (
        <ShoppingListDiv>
            <ShoppingListContent>
                <Options togglePopUpFunc={togglePopUpFunc} downloadShoppingListFunc={downloadShoppingList} />

                <h3>Shopping List</h3>
                <Ul>
                    {Object.entries(grocerySectionIngredientsMap).map(([name, section], index) =>
                        // toJSON is being inserted at somepoint not sure where
                        // prety sure its due to the fact that its a default dict
                        name === "toJSON" ? null : <GrocerySection key={index} sectionName={name} section={section} />
                    )}
                </Ul>
            </ShoppingListContent>
        </ShoppingListDiv>
    );
};
