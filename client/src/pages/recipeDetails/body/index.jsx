import React from "react";
import { Times } from "./times";
import { Ingredients } from "./ingredients";
import { NotesAndInstructions } from "./notesAndInstructions";
import styled from "styled-components";

const BodyDiv = styled.div`
    width: 50vw;
    @media (max-width: 1199px) {
        width: 75vw;
    }
    @media (max-width: 768px) {
        width: 90vw;
    }
`;
const Spacer = styled.div`
    margin-top: 15px;
`;
/*
    SUMMARY:
        Page to display more information about recipe

    PARAMS: 
        _id: recipe ID

*/
export const Body = ({ recipe }) => {
    return (
        <>
            <BodyDiv>
                <Spacer>
                    <Times
                        _id={recipe._id}
                        prepTime={recipe.recipeDetails.prepTime}
                        cookTime={recipe.recipeDetails.cookTime}
                        servings={recipe.servings}
                        dificulty={recipe.recipeDetails.dificulty}
                    />
                </Spacer>
                <Spacer>
                    <Ingredients ingredients={recipe.ingredients} />
                </Spacer>
                <Spacer>
                    <NotesAndInstructions _id={recipe._id} notes={recipe.recipeDetails.notes} instructions={recipe.recipeDetails.Instructions} />
                </Spacer>
            </BodyDiv>
        </>
    );
};
