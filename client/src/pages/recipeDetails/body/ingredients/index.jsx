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
export const Ingredients = ({ ingredients }) => {
    return (
        <>
            <Header />
            <MainDiv>
                <ul>
                    {ingredients.map((ingredient) => (
                        <li key={ingredient._id}>{ingredient.name}</li>
                    ))}
                </ul>
            </MainDiv>
        </>
    );
};
