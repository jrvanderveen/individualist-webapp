import React, { useState, useContext } from "react";
import { GlobalContext } from "../../../../context/globalState";
import { Ingredient } from "./ingredient";
import { List, AccordionButton, Input, AccordionContent } from "../../../../elements/index";
import styled from "styled-components";

// Styled Components
const Wrapper = styled.div`
    margin: auto;
`;

/*
    SUMMARY:
        Display grocery sections in shopping list.
        Display ingredients in accordion content.
            display add ingredient at end 

    PARAMS: 
        sectionName: grocery section name
        section: list of ingredients in grocery section
        clearSwitch: bool updated when user hits clear shopping list

*/
export const GrocerySection = ({ sectionName, section }) => {
    const isSectionComplete = () => {
        let complete = true;
        section.forEach((ingredient) => {
            if (!ingredient.lineThrough) {
                complete = false;
            }
        });
        console.log();
        return complete;
    };

    // Context
    const { addIngredientToShoppingListSection } = useContext(GlobalContext);

    // State
    const [newIngredient, setNewIngredient] = useState("");
    const [placeHolderText] = useState(`Enter ${sectionName}...`);
    const [showIngredients, setShowIngredients] = useState(true);
    const [completedSection, setCompletedSection] = useState(isSectionComplete());

    // Functions
    // Open or close accordion content
    const toggleAccordion = () => {
        setShowIngredients(!showIngredients);
    };

    //handle line through
    const ingredientSetLineThrough = () => {
        setCompletedSection(isSectionComplete());
    };

    // Create new ingredient, update accordion content height, reset new ingredient
    const handleOnClick = () => {
        if (newIngredient.length === 0) {
            return;
        }
        addIngredientToShoppingListSection(sectionName, newIngredient);
        setCompletedSection(false);
        setNewIngredient("");
    };

    // Hit enter for new ingredient
    const handleKeyDown = (key) => {
        if (key === "Enter") {
            handleOnClick();
        }
    };

    //sort section ingredients
    const compare = (a, b) => {
        if (a.lineThrough < b.lineThrough) {
            return -1;
        }
        if (a.lineThrough > b.lineThrough) {
            return 1;
        }
        if (a.lineThrough && b.lineThrough) {
            return 0;
        }
        return compareString(a, b);
    };
    //helper
    const compareString = (a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
    };
    //
    return (
        <>
            <AccordionButton isShoppingList onClick={toggleAccordion}>
                <List active={showIngredients} isGrocerySectionHeader key={sectionName} ingredientCount={section.length} completed={completedSection}>
                    {sectionName}
                </List>
            </AccordionButton>
            {showIngredients && (
                <AccordionContent>
                    <ul>
                        {section.sort(compare).map((ingredient, index) => (
                            <Ingredient
                                key={`${index}-${ingredient._id}`}
                                ingredient={ingredient}
                                sectionName={sectionName}
                                ingredientSetLineThroughFunc={ingredientSetLineThrough}
                            />
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
            )}
        </>
    );
};
