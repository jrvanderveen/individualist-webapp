import React from "react";
import StarRatings from "react-star-ratings";
import { BackButtonSvg } from "../../../components/SVG/backButtonSvg";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

// Styled components
const H1 = styled.h1`
    margin-top: 15px;
    text-align: center;
    width: 50vw;
    @media (max-width: 768px) {
        width: 90vw;
    }
`;
const H5 = styled.h5`
    text-align: center;
    width: 50vw;
    color: grey;
    @media (max-width: 768px) {
        width: 90vw;
    }
`;
const HeaderAndBackDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const TitelWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;
/*
    SUMMARY:
        Header for Recipe Detail Page
    PARAMS: 
    
*/

export const Header = ({ name, rating, mealType }) => {
    return (
        <>
            <HeaderAndBackDiv>
                <RouterLink to={"/"}>
                    <BackButtonSvg />
                </RouterLink>
                <TitelWrapper>
                    <H1>{name}</H1>
                    <H5>({mealType})</H5>
                </TitelWrapper>
            </HeaderAndBackDiv>
            <StarRatings rating={rating} starRatedColor="blue" numberOfStars={5} starDimension="20px" starSpacing="2.5px" />
        </>
    );
};
