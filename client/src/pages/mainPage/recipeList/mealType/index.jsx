import React, { useState, useEffect } from "react";
import DropdownButtonImported from "react-bootstrap/DropdownButton";
import DropdownImported from "react-bootstrap/Dropdown";

/*
    SUMMARY:
        Drop down button for meal types

    PARAMS: 

*/

export const MealTypesDropDown = ({ defaultType, types, onChange }) => {

    // Context
    const [mealType, setMealType] = useState(defaultType);
    
    //functions
    useEffect(() => {
        if(mealType === ""){
            handleChange(defaultType)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultType])

    const handleChange = (text) => {
        onChange(text)
        setMealType(text)
    }

    return (
        <DropdownButtonImported className="dropdown-button-drop-right" drop="right" size="lg" variant="info" title={mealType}>
            {types.map((type, index) => (
                <DropdownImported.Item key={index} onClick={(e) => handleChange(e.target.text)} eventKey={index + 1}>
                    {type}
                </DropdownImported.Item>
            ))}
        </DropdownButtonImported>
    );
};
