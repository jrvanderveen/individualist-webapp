import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../../context/globalState";
import { Recipe } from "./recipe";
import { SearchBar } from "./searchBar";
import { SettingsSvg } from "../../../components/SVG/settingSvg";
import styled from "styled-components";

// Styled Components
const SearchBarWrapper = styled.div`
    padding-left: 3%;
`;
const Ul = styled.ul`
    padding-left: 3%;
`;
const HeaderWrapper = styled.div``;
const H3 = styled.h3`
    border-bottom: 1px solid #bbb;
    margin: 20px 0 10px;
`;
const SVGWrapper = styled.div`
    padding-bottom: 1px;
`;
/*
    SUMMARY:
        Get recipes from DB and map them to recipe components.
        Link to settings page

    PARAMS: 

*/
export const RecipeList = () => {
    // Context
    const { recipes, onStartUp } = useContext(GlobalContext);
    // State
    const [searchText, setSearchText] = useState("");

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
            <HeaderWrapper>
                <Link to="/settings">
                    <SVGWrapper>
                        <SettingsSvg />
                    </SVGWrapper>
                </Link>

                <H3>Recipes</H3>
            </HeaderWrapper>
            <SearchBarWrapper>
                <SearchBar searchText={searchText} setSearchTextFunc={setSearchText} />
            </SearchBarWrapper>
            <Ul>
                {Object.entries(recipes).map(([_id, recipe]) => (recipe.name.toLowerCase().includes(searchText) ? <Recipe key={_id} recipe={recipe} /> : null))}
            </Ul>
        </>
    );
};
