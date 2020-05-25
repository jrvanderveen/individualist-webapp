import React, { useState } from "react";
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
            <DropdownImported.Item onClick={(e) => handleChange(e.target.text)} eventKey="1">
                Produce
            </DropdownImported.Item>
            <DropdownImported.Item onClick={(e) => handleChange(e.target.text)} eventKey="2">
                Meat/Seafood
            </DropdownImported.Item>
            <DropdownImported.Item onClick={(e) => handleChange(e.target.text)} eventKey="3">
                Deli/Prepared
            </DropdownImported.Item>
            <DropdownImported.Item onClick={(e) => handleChange(e.target.text)} eventKey="3">
                Other
            </DropdownImported.Item>
        </DropdownButtonImported>
    );
};
