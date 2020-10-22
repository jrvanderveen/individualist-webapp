import React from 'react'
import styled from "styled-components"

const Wrapper = styled.div`
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 100%;
    top: 0px;
    right: 0px;
    background-color: rgba(0, 0, 0, 0.25);
`;

const ContentWrapper = styled.div`
    background-color: white;
    position: absolute;
    top: 30%;
    left: 40%;
    width: 20%;
    @media (max-width: 900px) {
        left: 35%;
        width: 30%;
    }
    @media (max-width: 550px) {
        left: 25%;
        width: 50%;
    }
    padding: 20px;
    border-radius: 5px;
    border: 2px solid black;
`;

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
`
const ApplyButton = styled.button`
    cursor: pointer;
    background-color: #9c88ff;
    box-shadow: var(--box-shadow);
    color: #fff;
    border: 0;
    display: block;
    font-size: "14px";
    padding: 5px;
    width: 50%;
`

export  const FilterPopUp = ({togglePopUpFunc}) => {
    const onApply = () => {
        togglePopUpFunc()
    }
    return (
        <Wrapper>
            <ContentWrapper>
                <ExitButton onClick={togglePopUpFunc}>&times;</ExitButton>
                <p>Sort BY</p>
                <ul>
                    <li>Date added</li>
                </ul>
                <p>Filter</p>
                <ul>
                    <li>Dificulty</li>
                    <li>Total time</li>
                    <li>Recipe type</li>
                    <li>Rating</li>
                    <li>Website</li>
                </ul>
                <ApplyButton onClick={onApply}>Apply</ApplyButton>
            </ContentWrapper>
        </Wrapper>
    )
}


