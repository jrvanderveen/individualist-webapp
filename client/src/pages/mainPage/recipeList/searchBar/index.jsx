import React from "react";
import { Input } from "../../../../elements/index";

/*
    SUMMARY:
        Search for recipes by name

    PARAMS: 

*/
export const SearchBar = ({ searchText, setSearchTextFunc }) => {
    return (
        <>
            <Input type="text" value={searchText} onChange={(e) => setSearchTextFunc(e.target.value)} placeholder="search..."></Input>
        </>
    );
};
