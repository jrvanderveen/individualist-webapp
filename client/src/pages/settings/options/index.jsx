import React from "react";
import { HomeSvg } from "../../../components/SVG/homeSvg";
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
    margin: 15px 5px 0px 5px;
    width: 90%;
    min-height: ${(props) => props.seperate && "60px"};

    &:hover {
        background-color: #8171d1;
    }
`;

const Wrapper = styled.div`
    @media (min-width: 1200px) {
        position: fixed;
        left: 0px;
        top: 30%;
        max-width: 300px;
        min-width: 250px;
    }
    @media (max-width: 1199px) {
        position: relative;
        max-width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;

/*
    SUMMARY:
        Settings options to go home or switch between settings pages        

    PARAMS: 
        settingLabels: different settings names
        selectSettingPage: pass through the option selected

*/
export const Options = ({ settingLabels, selectSettingPage, history }) => {
    const onClickHome = () => {
        history.push("/");
    };

    return (
        <Wrapper>
            {settingLabels.map((label) => (
                <Button key={label} bottom onClick={() => selectSettingPage(label)}>
                    {label}
                </Button>
            ))}
            <Button seperate onClick={() => onClickHome()}>
                Home
            </Button>
            <HomeSvg />
        </Wrapper>
    );
};
