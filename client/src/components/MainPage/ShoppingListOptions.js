import React, { useContext } from "react";
import { Wrapper, Button } from "../../elements/index";
import styled from "styled-components";
import { GlobalContext } from "../../context/GlobalState";

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

export const ShoppingListOptions = ({ togglePopUpFunc, downloadShoppingListFunc, setDidClearFunc }) => {
    const { clearShoppingList } = useContext(GlobalContext);

    const handleClick = (call) => {
        if (call === "exit") {
            togglePopUpFunc();
        } else if (call === "download") {
            downloadShoppingListFunc();
        } else if (call === "clear") {
            setDidClearFunc(true);
            clearShoppingList();
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
