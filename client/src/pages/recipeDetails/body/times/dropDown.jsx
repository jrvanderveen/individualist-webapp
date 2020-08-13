import React from "react";
import DropdownButtonImported from "react-bootstrap/DropdownButton";
import DropdownImported from "react-bootstrap/Dropdown";

/*
    SUMMARY:
        Drop down button for recipe dificulty

    PARAMS: 
        defaultVal value
*/

export const DropDownButton = ({ defaultVal, options, updateSelectedFunc }) => {
    return (
        <DropdownButtonImported className="dropdown-button-drop-right" drop="right" size="sm" variant="info" title={defaultVal} style={{ marginLeft: "5px" }}>
            {options.map((option, index) => (
                <DropdownImported.Item key={index} onClick={(e) => updateSelectedFunc(e.target.text)} eventKey={index + 1}>
                    {option}
                </DropdownImported.Item>
            ))}
        </DropdownButtonImported>
    );
};
