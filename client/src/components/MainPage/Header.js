import React, { useContext } from "react";
import styled from "styled-components";
import { GlobalContext } from "../../context/GlobalState";

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
        Header for site
        Welcom
    PARAMS: 
    
*/

export const Header = () => {
    const { username } = useContext(GlobalContext);

    return (
        <Wrapper>
            <H1>INDIVIDUA&#8729;LIST</H1>
            <div>Welcome {username}</div>
        </Wrapper>
    );
};
