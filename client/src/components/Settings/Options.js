import React from "react";
import { Link } from "react-router-dom";
import { HomeSvg } from "../SVG/HomeSvg";
import styled from "styled-components";

// Styled Components
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
    position: absolute;
    left: 0px;
    top: 40%;
    max-width: 300px;
    min-width: 250px;
`;

/*
    SUMMARY:
        Settings options to go home or switch between settings pages        

    PARAMS: 
        settingLabels: different settings names
        selectSettingPage: pass through the option selected

*/
export const Options = ({ settingLabels, selectSettingPage }) => {
    return (
        <Div>
            <Link to="/">
                <Button top isLink>
                    <HomeSvg />
                    Home
                </Button>
            </Link>
            {settingLabels.map((label) => (
                <Button key={label} bottom onClick={() => selectSettingPage(label)}>
                    {label}
                </Button>
            ))}
        </Div>
    );
};
