import React, { useState, useRef, useEffect, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";

import styled from "styled-components";
import { ShoppingListIngredient } from "./ShoppingListIngredient";

import { List, AccordionButton, Input, AccordionContent } from "../../elements/index";

const Ul = styled.ul`
    padding-left: 3%;
`;

const Wrapper = styled.div`
    margin: auto;
`;

export const ShoppingListGrocerySection = ({ sectionName, section, clearSwitch }) => {
    const { addIngredientToShoppingListSection } = useContext(GlobalContext);

    const content = useRef(null);
    const [setActive, setActiveState] = useState("active");
    const [setHeight, setHeightState] = useState("0px");

    const toggleAccordion = (props) => {
        setActiveState(setActive === "" ? "active" : "");
        setHeightState(setActive === "active" ? "0px" : `${content.current.scrollHeight}px`);
    };

    /////////////////////////////////////
    const [newIngredient, setNewIngredient] = useState("");
    const [placeHolderText, setPlaceHolderText] = useState(`Enter ${sectionName}`);

    const handleOnClick = () => {
        if (newIngredient.length === 0) {
            return;
        }
        addIngredientToShoppingListSection(sectionName, newIngredient);
        setHeightState(`${content.current.scrollHeight + 36}px`);
        setNewIngredient("");
    };

    const handleKeyDown = (key) => {
        if (key === "Enter") {
            handleOnClick();
        }
    };

    useEffect(() => {
        if (section.length === 0) {
            setHeightState("56px");
        } else {
            setHeightState(`${content.current.scrollHeight}px`);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clearSwitch]);

    return (
        <>
            <AccordionButton isShoppingList onClick={toggleAccordion}>
                <List active={setActive} isGrocerySectionHeader key={sectionName} ingredientCount={section.length}>
                    {sectionName}
                </List>
            </AccordionButton>
            <AccordionContent ref={content} maxHeight={setHeight}>
                <ul>
                    {section.map((ingredient, index) => (
                        <ShoppingListIngredient key={`${index}-${ingredient._id}`} ingredient={ingredient.name} />
                    ))}
                    <List isShoppingListIngredient isForm>
                        <Input
                            onKeyDown={(e) => handleKeyDown(e.key)}
                            isShoppingListIngredient
                            value={newIngredient}
                            onChange={(e) => setNewIngredient(e.target.value)}
                            placeholder={placeHolderText}
                        />
                        <Wrapper>
                            <button className="float-right btn btn-success btn-sm" onClick={handleOnClick}>
                                +
                            </button>
                        </Wrapper>
                    </List>
                </ul>
            </AccordionContent>
        </>
    );
};
