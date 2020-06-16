import React, { useState, useRef, useEffect } from "react";

import styled from "styled-components";
import { ShoppingListIngredient } from "./ShoppingListIngredient";

import { List, AccordionButton, AccordionContent } from "../../elements/index";

export const ShoppingListGrocerySection = ({ name, section }) => {
    const content = useRef(null);
    const [setActive, setActiveState] = useState("active");
    const [setHeight, setHeightState] = useState("0px");

    const toggleAccordion = (props) => {
        setActiveState(setActive === "" ? "active" : "");
        setHeightState(setActive === "active" ? "0px" : `${content.current.scrollHeight}px`);
    };

    useEffect(() => {
        setHeightState(`${content.current.scrollHeight}px`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <AccordionButton isShoppingList onClick={toggleAccordion}>
                <List active={setActive} isGrocerySectionHeader key={name} ingredientCount={section.length}>
                    {name}
                </List>
            </AccordionButton>
            <AccordionContent ref={content} maxHeight={setHeight}>
                <ul>
                    {section.map((ingredient) => (
                        <ShoppingListIngredient key={ingredient._id} ingredient={ingredient.name} />
                    ))}
                </ul>
            </AccordionContent>
        </>
    );
};
