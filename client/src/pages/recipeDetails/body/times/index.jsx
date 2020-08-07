import React from "react";
import styled from "styled-components";

// Styled components
const MainDiv = styled.div`
    margin-top: 20px;
    padding: 11px 10px;
    border: 1px solid rgba(0, 0, 0, 0.29);
    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const TimesDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-between;
    margin-right: 15vw;
`;

const OtherDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-between;
`;

/*
    SUMMARY:
        Display:
            cooktime
            preptime
            dificulty
            servings
    PARAMS: 
    
*/

export const Times = (props) => {
    const { prepTime, cookTime, servings, dificulty } = props;
    return (
        <MainDiv>
            <TimesDiv>
                <div>Prep: {prepTime} Min</div>
                <div>Cook: {cookTime} Min</div>
            </TimesDiv>
            <OtherDiv>
                <div>Dificulty: {dificulty}</div>
                <div>Servings: {servings} </div>
            </OtherDiv>
        </MainDiv>
    );
};
