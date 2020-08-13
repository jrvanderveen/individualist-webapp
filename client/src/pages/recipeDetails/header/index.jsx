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
const HeaderAndBackDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
/*
    SUMMARY:
        Header for Recipe Detail Page
    PARAMS: 
    
*/

export const Header = ({ name, rating }) => {
    return (
        <>
            <HeaderAndBackDiv>
                <RouterLink to={"/"}>
                    <BackButtonSvg />
                </RouterLink>
                <H1>{name}</H1>
            </HeaderAndBackDiv>
            <StarRatings rating={rating} starRatedColor="blue" numberOfStars={5} starDimension="20px" starSpacing="2.5px" />
        </>
    );
};
