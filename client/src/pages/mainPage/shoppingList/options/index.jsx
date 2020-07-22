import React, { useContext } from "react";
import { GlobalContext } from "../../../../context/globalState";
import { Wrapper, Button } from "../../../../elements/index";
import styled from "styled-components";

// Styled components
const ExitButton = styled.button`
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

/*
    SUMMARY:
        Exit, Clear, or Download shopping lit

    PARAMS: 
        togglePopUpFunc: Close shoppinglist popup
        downloadShoppingListFunc: download current ingredients in shoppinglist
        setClearSwitchFunc: Clear shoppinglist ingredients
*/
export const Options = ({ togglePopUpFunc, downloadShoppingListFunc, setClearSwitchFunc }) => {
    // State
    const { clearShoppingList } = useContext(GlobalContext);

    // Functions
    // Exit, download, save
    const handleClick = (call) => {
        if (call === "exit") {
            togglePopUpFunc();
        } else if (call === "download") {
            downloadShoppingListFunc();
        } else if (call === "clear") {
            clearShoppingList();
            setClearSwitchFunc();
        }
    };
    return (
        <Wrapper>
            <ExitButton onClick={() => handleClick("exit")}>&times;</ExitButton>
            <Button isShoppingListOption onClick={() => handleClick("download")}>
                Download
            </Button>
            {/* <Button isShoppingListOption>Save</Button> */}
            <Button isShoppingListOption onClick={() => handleClick("clear")}>
                Clear
            </Button>
        </Wrapper>
    );
};
