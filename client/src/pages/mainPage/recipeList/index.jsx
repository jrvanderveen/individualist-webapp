import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../../context/globalState";
import { Recipe } from "./recipe";
import { SettingsSvg } from "../../../components/SVG/settingSvg";
import styled from "styled-components";
import { H3 } from "../../../elements/index";

// Styled Components
const Ul = styled.ul`
    padding-left: 3%;
`;

/*
    SUMMARY:
        Get recipes from DB and map them to recipe components.
        Link to settings page

    PARAMS: 

*/
export const RecipeList = () => {
    // State
    const { recipes, onStartUp } = useContext(GlobalContext);

    // Functions
    // If reder check if we need to get recipes.
    //      if visiting the settings page and returning no update needed
    useEffect(() => {
        if (Object.entries(recipes).length === 0) {
            onStartUp();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <Link to="/settings">
                <SettingsSvg />
            </Link>

            <H3>Recipes</H3>
            <Ul>
                {Object.entries(recipes).map(([_id, recipe]) => (
                    <Recipe key={_id} recipe={recipe} />
                ))}
            </Ul>
        </>
    );
};
