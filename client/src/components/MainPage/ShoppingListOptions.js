import React from "react";
import { Wrapper, Button } from "../../elements/index";
import styled from "styled-components";

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

export const ShoppingListOptions = ({ togglePopUpFunc, downloadShoppingListFunc }) => {
    const handleClick = (call) => {
        if (call === "exit") {
            togglePopUpFunc();
        } else if (call === "download") {
            downloadShoppingListFunc();
        }
    };

    return (
        <Wrapper>
            <ExitButton onClick={() => handleClick("exit")}>&times;</ExitButton>
            <Button isShoppingListOption onClick={() => handleClick("download")}>
                Download
            </Button>
            <Button isShoppingListOption>Save</Button>
        </Wrapper>
    );
};
