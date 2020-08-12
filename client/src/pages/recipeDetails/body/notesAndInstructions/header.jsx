import React from "react";
import styled from "styled-components";
import StarRatings from "react-star-ratings";

// Styled components
const H3 = styled.h3`
    margin-top: 15px;
`;

/*
    SUMMARY:
        Header for Recipe Detail Page
    PARAMS: 
    
*/

export const Header = () => {
    return (
        <>
            <H3>Notes and Instructions</H3>
        </>
    );
};
