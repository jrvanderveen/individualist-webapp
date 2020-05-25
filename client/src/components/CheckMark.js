import React, { useContext } from "react";
import styled from "styled-components";
import { Wrapper } from "../elements/index";
import { GlobalContext } from "../context/GlobalState";

const CheckMarkStyle = styled.svg`
    width: 24px;
    height: 24px;
    opacity: 0;
    transition: opacity 0.3s ease;
    ${Wrapper}:hover & {
        opacity: ${(props) => (props.available === true ? 1 : 0)};
    }

    position: absolute;

    top: 0px;
    left: 0px;
    transform: translate(-100%, 175%);
`;

export const CheckMark = (props) => {
    const { creatingShoppingList } = useContext(GlobalContext);
    return (
        <CheckMarkStyle available={creatingShoppingList} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
        </CheckMarkStyle>
    );
};
