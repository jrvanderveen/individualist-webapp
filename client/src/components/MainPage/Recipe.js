import React, { useContext, useState, useRef } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { Ingredients } from "./Ingredients";
import { CheveronSvg } from "../SVG/CheveronSvg";
import { SelectRecipeButton } from "./SelectRecipeButton";
import { List, AccordionButton, Wrapper, DeleteButton, Link, AccordionContent, Input, Label } from "../../elements/index";
import styled from "styled-components";

// Styled Components
const Ul = styled.ul`
    width: 100%;
    list-style: none;
`;

const Li = styled.li`
    float: left;
    width: ${(props) => (props.large ? "45%" : "27.5%")};
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 0px 5px 0px;
    cursor: pointer;
`;

const StyledLink = styled(Link)`
    color: blue;
    font-size: 75%;
`;

const Span = styled.span`
    color: blue;
    font-size: 75%;
    float: right;
    &:hover {
        cursor: pointer;
    }
    margin-left: ${(props) => (props.isSave ? "10px" : "")};
`;

/*
    SUMMARY:
        Display non ingredient recipe attributes.  Allow delete recipe  
        Create accordion content containing ingredients.
        Create the recipe obj which will be used to display edit and replace recipe on save.

    PARAMS: 
        recipe: recipe to display 

*/
export const Recipe = ({ recipe }) => {
    // Context
    const { deleteRecipe, saveEditedRecipe } = useContext(GlobalContext);

    // State
    const [setActive, setActiveState] = useState(false);
    const [setHeight, setHeightState] = useState("0px");
    const [setRotate, setRotateState] = useState("");
    const [recipeObj, setRecipeObj] = useState({ active: false, recipe: recipe, editRecipe: {} });

    // Window
    const content = useRef(null);

    // Functions
    // display or dont display ingredients.  rotate the cheveron svg
    const toggleAccordion = () => {
        setActiveState(!setActive);
        setHeightState(setActive ? "0px" : `${content.current.scrollHeight}px`);
        setRotateState(setActive ? "" : "rotate");
    };

    // Decrease accodion content height
    const handleDeleteIngredient = () => {
        setHeightState(`${content.current.scrollHeight - 50.833333}px`);
    };

    // Increase accodion content height
    const handleAddIngredient = () => {
        setHeightState(`${content.current.scrollHeight + 50.833333}px`);
    };

    // Edit: clone recipe to use for edint and togle accordion open
    // Save: replace recipe with editRecipe
    // Cancle: delete edit recipe
    const handleEditingClicks = (type) => {
        // On eddit set active to true and clone recipe object to edit
        if (type === "edit") {
            setRecipeObj({ ...recipeObj, active: true, editRecipe: recipeObj.recipe });
            if (!setActive) toggleAccordion();

            // On save set active to false and replace recipe with cloned/edited version
        } else if (type === "save") {
            saveEditedRecipe(recipeObj.editRecipe);
            setRecipeObj({ ...recipeObj, active: false, recipe: recipeObj.editRecipe, editRecipe: {} });
            //On cancle set active to false and deleted clone
        } else if (type === "cancle") {
            setRecipeObj({ ...recipeObj, active: false, editRecipe: {} });
        }
    };

    const qualifiedWebsiteFunc = () => {
        let url = recipeObj.recipe.URL;
        if (!/^https?:\/\//i.test(url)) {
            url = "http://" + url;
        }
        return url;
    };
    const website = qualifiedWebsiteFunc();

    // Display recipe options and links above recipe
    // display recipe attributes in button
    // accordion content: ingredients
    // If in eding mode display editRecipe values
    return (
        <>
            <Wrapper isRecipe>
                {!recipeObj.active ? (
                    <>
                        <SelectRecipeButton active={recipeObj.recipe.addToShoppingList} recipe_id={recipeObj.recipe._id} />
                        <DeleteButton isRecipe onClick={() => deleteRecipe(recipeObj.recipe._id)}>
                            x
                        </DeleteButton>
                        <StyledLink text="Website" href={website} />
                        <Span onClick={() => handleEditingClicks("edit")}>Edit</Span>
                    </>
                ) : (
                    <>
                        <Input
                            isRecipeWebsite
                            type="text"
                            placeholder="Enter URL..."
                            value={recipeObj.editRecipe.URL || ""}
                            onChange={(e) => setRecipeObj({ ...recipeObj, editRecipe: { ...recipeObj.editRecipe, URL: e.target.value } })}
                        />
                        <Span isSave onClick={() => handleEditingClicks("save")}>
                            Save
                        </Span>
                        <Span isEdit onClick={() => handleEditingClicks("cancle")}>
                            Cancle
                        </Span>
                    </>
                )}

                <AccordionButton active={setActive} onClick={() => (!recipeObj.active ? toggleAccordion() : null)}>
                    <List active={setActive || recipeObj.active} ingredientCount={recipeObj.recipe.ingredients.length} isRecipe>
                        <Ul>
                            {!recipeObj.active ? (
                                <>
                                    <Li large key="name">
                                        {recipeObj.recipe.name}
                                    </Li>
                                    <Li med key="servings">
                                        Servings: {recipeObj.recipe.servings}
                                    </Li>
                                    <Li med key="ingredientCount">
                                        Ingredients: {recipeObj.recipe.ingredients.length} &nbsp;&nbsp;
                                        <CheveronSvg rotate={setRotate} />
                                    </Li>
                                </>
                            ) : (
                                <>
                                    <Li large key="name">
                                        <Input
                                            type="text"
                                            placeholder="Enter Name..."
                                            value={recipeObj.editRecipe.name || ""}
                                            onChange={(e) => setRecipeObj({ ...recipeObj, editRecipe: { ...recipeObj.editRecipe, name: e.target.value } })}
                                        />
                                    </Li>
                                    <Li med key="servings">
                                        <Label isRecipeServings>Servings</Label>
                                        <Input
                                            isRecipeServings
                                            type="number"
                                            min="1"
                                            max="99"
                                            value={recipeObj.editRecipe.servings || 1}
                                            onChange={(e) => setRecipeObj({ ...recipeObj, editRecipe: { ...recipeObj.editRecipe, servings: e.target.value } })}
                                            placeholder="Enter Servings..."
                                        />
                                    </Li>
                                    <Li med key="ingredientCount">
                                        Ingredients: {recipeObj.recipe.ingredients.length} &nbsp;&nbsp;
                                        <CheveronSvg rotate={setRotate} />
                                    </Li>
                                </>
                            )}
                        </Ul>
                    </List>
                </AccordionButton>
            </Wrapper>
            {/* Accordion Content contains list of ingredients */}
            <AccordionContent ref={content} maxHeight={setHeight}>
                <Ingredients
                    handleDeleteIngredient={handleDeleteIngredient}
                    handleAddIngredient={handleAddIngredient}
                    recipeObj={recipeObj}
                    setRecipeObjFunc={setRecipeObj}
                />
            </AccordionContent>
        </>
    );
};
