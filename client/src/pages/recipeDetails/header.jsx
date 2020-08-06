import React from "react";
import styled from "styled-components";

// Styled components
const H1 = styled.h1`
    margin-top: 15px;
`;

/*
    SUMMARY:
        Header for Recipe Detail Page
    PARAMS: 
    
*/

export const Header = ({ name }) => {
    return (
        <>
            <H1>{name}</H1>
        </>
    );
};
