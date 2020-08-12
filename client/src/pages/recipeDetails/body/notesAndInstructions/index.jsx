import React from "react";
import styled from "styled-components";
import { Header } from "./header";

// Styled components
const MainDiv = styled.div`
    padding: 11px 10px;
    border: 1px solid rgba(0, 0, 0, 0.29);
    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: space-between;
`;
/*
    SUMMARY:
        Display recipe ingredients on details page

    PARAMS: 
        _id: recipe ID

*/
export const NotesAndInstructions = ({ notes, instructions }) => {
    return (
        <>
            <Header />
            <MainDiv>{instructions}</MainDiv>
        </>
    );
};
