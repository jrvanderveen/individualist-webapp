import React, { useState, useEffect } from "react";
import DropdownButtonImported from "react-bootstrap/DropdownButton";
import DropdownImported from "react-bootstrap/Dropdown";

export const DropDownButton = (props) => {
    const [grocerySection, setGrocerySection] = useState(props.default);

    const handleChange = (text) => {
        setGrocerySection(text);
        if (props.handleChange) {
            props.handleChange(text);
        }
    };

    return (
        <DropdownButtonImported className={`dropdown-button-drop-right`} drop="right" size="sm" variant="secondary" title={grocerySection}>
            {props.sections.map((section, index) => (
                <DropdownImported.Item key={index} onClick={(e) => handleChange(e.target.text)} eventKey={index + 1}>
                    {section}
                </DropdownImported.Item>
            ))}
        </DropdownButtonImported>
    );
};
