import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../../context/globalState";
import { Recipe } from "./recipe";
import { SearchBar } from "./searchBar";
import { SettingsSvg } from "../../../components/SVG/settingSvg";
import { FilterSvg } from "../../../components/SVG/filterSvg";
import {FilterPopUp} from "./filterPopUp"
import styled from "styled-components";

// Styled Components
const SearchWrapper = styled.div`
    padding-left: 3%;
    display: flex;
    align-items: center;
`;
const Ul = styled.ul`
    padding-left: 3%;
`;
const HeaderWrapper = styled.div``;
const H3 = styled.h3`
    border-bottom: 1px solid #bbb;
    margin: 20px 0 10px;
`;
const SvgWrapper = styled.div`
    padding-bottom: 1px;
`;
const SvgButton = styled.button`
    padding: 0px;
    border:0px;
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
    const [showPopUp, setShowPopUp] = useState(false);
    const togglePopUp = () => {
        setShowPopUp(!showPopUp);
    };

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
            {showPopUp === true ? <FilterPopUp togglePopUpFunc={togglePopUp} /> : null}
            <HeaderWrapper>
                <Link to="/settings">
                    <SvgWrapper>
                        <SettingsSvg />
                    </SvgWrapper>
                </Link>

                <H3>Recipes</H3>
            </HeaderWrapper>
            <SearchWrapper>
                <SearchBar searchText={searchText} setSearchTextFunc={setSearchText} />
                <SvgButton onClick={togglePopUp}>
                    <FilterSvg />
                </SvgButton>
            </SearchWrapper>
            <Ul>
                {Object.entries(recipes).map(([_id, recipe]) =>
                    recipe.name.toLowerCase().includes(searchText.toLowerCase()) ? <Recipe key={_id} recipe={recipe} /> : null
                )}
            </Ul>
        </>
    );
};
