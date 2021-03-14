import React, { useContext, useState } from "react";
import { GlobalContext } from "../../../context/globalState";
import { MealType } from "./mealType";
import { H3, List, Input } from "../../../elements/index";
import styled from "styled-components";

// Styled Components
const Ul = styled.ul`
    padding-left: 3%;
`;

const Wrapper = styled.div`
    margin: auto;
`;

/*
    SUMMARY:
        Set up meal types to assign to recipes (Dinner, Lunch, Snacks...)             
    PARAMS: 
        

*/
export const MealTypes = () => {
    // Context
    const { mealTypes, addMealType } = useContext(GlobalContext);

    // State
    const [mealType, setMealType] = useState("");
    const [placeHolderText, setPlaceHolderText] = useState("Enter Meal Type...");
    const [errors, setErrors] = useState([]);

    // Create new meal type
    const handleOnClick = () => {
        let errs = [];
        if (mealType.length === 0) {
            setPlaceHolderText("Enter Meal Type...");
            return;
        }
        let foundMatch = false;
        mealTypes.types.forEach((type) => {
            if (type.toLowerCase() === mealType.toLowerCase()) {
                setMealType("");
                setPlaceHolderText("Meal Type Names Must Be Unique");
                errs.push("Meal Type Names Must Be Unique");
                foundMatch = true;
                return;
            }
        });
        setErrors(errs);
        if (foundMatch) return;
        addMealType(mealType);
        setMealType("");
    };

    // allow enter to create meal type
    const handleKeyDown = (key) => {
        if (key === "Enter") {
            handleOnClick();
        }
    };

    return (
        <>
            <H3>Meal Types</H3>
            {errors.map((error) => (
                <p className="error" key={error}>
                    {error}
                </p>
            ))}
            <Ul>
                {mealTypes.types.map((type) => (
                    <MealType
                        key={type}
                        typeLabel={type}
                        isDefault={type === mealTypes.default}
                        defaultType={mealTypes.default}
                        setErrorsFunc={setErrors}
                    />
                ))}
                <List>
                    <Input
                        onKeyDown={(e) => handleKeyDown(e.key)}
                        isMealType
                        value={mealType}
                        onChange={(e) => setMealType(e.target.value)}
                        placeholder={placeHolderText}
                    />
                    <Wrapper>
                        <button className="float-right btn btn-success btn-sm" onClick={handleOnClick}>
                            +
                        </button>
                    </Wrapper>
                </List>
            </Ul>
        </>
    );
};
