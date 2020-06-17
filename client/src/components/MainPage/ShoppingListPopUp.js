import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import styled from "styled-components";
import { ShoppingListOptions } from "./ShoppingListOptions";
import { ShoppingListGrocerySection } from "./ShoppingListGrocerySection";
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
const Ul = styled.ul`
    margin-bottom: 5px;
`;

export const ShoppingListPopUp = ({ togglePopUpFunc }) => {
    // Reducers
    const { shoppingList } = useContext(GlobalContext);
    const grocerySectionIngredientsMap = shoppingList.grocerySectionIngredientsMap;
    const [clearSwitch, setClearSwitch] = useState(false);
    const setClearSwtichParrent = () => {
        setClearSwitch(!clearSwitch);
    };

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
            await axios.get("/api/v1/shoppingList/download", config).then((response) => {
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

    return (
        <ShoppingListDiv>
            <ShoppingListContent>
                <ShoppingListOptions
                    togglePopUpFunc={togglePopUpFunc}
                    downloadShoppingListFunc={downloadShoppingList}
                    setClearSwitchFunc={setClearSwtichParrent}
                />

                <h3>Shopping List</h3>
                <Ul>
                    {Object.entries(grocerySectionIngredientsMap).map(([name, section], index) =>
                        name === "toJSON" ? null : <ShoppingListGrocerySection key={index} sectionName={name} section={section} clearSwitch={clearSwitch} />
                    )}
                </Ul>
            </ShoppingListContent>
        </ShoppingListDiv>
    );
};
