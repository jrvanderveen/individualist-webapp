import React, { useContext, useEffect } from "react";
import { Recipe } from "./Recipe";
import { H3 } from "../../elements/index";
import { GlobalContext } from "../../context/GlobalState";
import styled from "styled-components";
import { SettingsSvg } from "./SettingSvg";
import { Link } from "react-router-dom";

const Ul = styled.ul`
    padding-left: 3%;
`;

export const RecipeList = () => {
    const { recipes, getRecipes } = useContext(GlobalContext);
    useEffect(() => {
        getRecipes();
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
