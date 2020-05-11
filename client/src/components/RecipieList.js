import React, { useContext } from "react";
import { Recipie } from "./Recipie";

import { GlobalContext } from "../context/GlobalState";

export const RecipieList = () => {
    const { recipies } = useContext(GlobalContext);

    return (
        <>
            <h3>Recipes</h3>
            <ul className="list">
                {recipies.map((recipie) => (
                    <Recipie key={recipie.id} recipie={recipie} />
                ))}
            </ul>
        </>
    );
};
