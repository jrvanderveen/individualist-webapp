import React, { useContext } from "react";
import styled from "styled-components";
import { GlobalContext } from "../../context/GlobalState";
import { HomeSvg as HomeIcon } from "./HomeSvg";
import { Link } from "react-router-dom";

const Button = styled.button`
    cursor: pointer;
    background-color: ${(props) => (props.clicked === true ? "#8171d1" : "#9c88ff")};
    box-shadow: var(--box-shadow);
    color: #fff;
    border: 0;
    font-size: 14px;
    padding: 5px;
    margin: ${(props) => (props.top ? "10px 5px 20px 5px" : "5px 5px 0px 5px")};
    width: 90%;
    &:hover {
        background-color: #8171d1;
    }
    text-align: center;
    ${(props) =>
        props.isLink
            ? `
        display: flex;
        align-items: center;

        `
            : ""};
`;

const Div = styled.div`
    position: fixed;
    left: 0px;
    top: 40%;
    max-width: 300px;
    min-width: 250px;
`;

const Span = styled.span``;

export const Options = ({ settingLabels, selectSettingPage }) => {
    console.log(settingLabels);
    return (
        <Div>
            <Link to="/">
                <Button top isLink>
                    <HomeIcon />
                    Home
                </Button>
            </Link>
            {settingLabels.map((label) => (
                <Button bottom onClick={() => selectSettingPage(label)}>
                    {label}
                </Button>
            ))}
        </Div>
    );
};
