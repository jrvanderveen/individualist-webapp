import React from "react";
import styled from "styled-components";
import StarRatings from "react-star-ratings";

// Styled components
const H1 = styled.h1`
    margin-top: 15px;
`;

/*
    SUMMARY:
        Header for Recipe Detail Page
    PARAMS: 
    
*/

export const Header = ({ name, rating }) => {
    return (
        <>
            <H1>{name}</H1>
            <StarRatings rating={rating} starRatedColor="blue" numberOfStars={5} starDimension="20px" starSpacing="2.5px" />
        </>
    );
};
