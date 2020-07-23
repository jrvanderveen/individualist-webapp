import React from "react";

import styled from "styled-components";

// Styled components
const H1 = styled.h1`
    margin-top: 15px;
`;

// Styled components
const Wrapper = styled.div`
    text-align: center;
`;
/*
    SUMMARY:
        Header for Settings Page
        
    PARAMS: 
    
*/

export const Header = () => {
    return (
        <Wrapper>
            <H1>INDIVIDUA&#8729;LIST</H1>
            <h3>Settings</h3>
        </Wrapper>
    );
};
