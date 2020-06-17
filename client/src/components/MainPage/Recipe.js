import React, { useContext, useState, useRef } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { Ingredients } from "./Ingredients";
import { CheveronSvg } from "../SVG/CheveronSvg";
import { List, AccordionButton, Wrapper, DeleteButton, Link, AccordionContent, Input, Label } from "../../elements/index";
import styled from "styled-components";
import { SelectRecipeButton } from "./SelectRecipeButton";

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

export const Recipe = ({ recipe }) => {
    // Reducers
    const { deleteRecipe } = useContext(GlobalContext);

    // Window
    const content = useRef(null);

    // Set/Update state
    const [setActive, setActiveState] = useState(false);
    const [setHeight, setHeightState] = useState("0px");
    const [setRotate, setRotateState] = useState("");
    const [recipeObj, setRecipeObj] = useState({ active: false, currRecipe: recipe, editRecipe: recipe });

    const toggleAccordion = () => {
        setActiveState(!setActive);
        setHeightState(setActive ? "0px" : `${content.current.scrollHeight}px`);
        setRotateState(setActive ? "" : "rotate");
    };

    const handleDeleteIngredient = () => {
        setHeightState(`${content.current.scrollHeight - 50.833333}px`);
    };
    const handleAddIngredient = () => {
        setHeightState(`${content.current.scrollHeight + 50.833333}px`);
    };
    const handleEditingClicks = (type) => {
        if (type === "edit") {
            setRecipeObj({ ...recipeObj, active: !recipeObj.active });
            if (!setActive) toggleAccordion();
        } else if (type === "save") {
            setRecipeObj({ ...recipeObj, active: !recipeObj.active, currRecipe: recipeObj.editRecipe });
        } else if (type === "cancle") {
            setRecipeObj({ ...recipeObj, active: !recipeObj.active, editRecipe: recipeObj.currRecipe });
        }
    };

    return (
        <>
            <Wrapper isRecipe>
                {!recipeObj.active ? (
                    <>
                        <SelectRecipeButton active={recipeObj.currRecipe.addToShoppingList} recipe_id={recipeObj.currRecipe._id} />
                        <DeleteButton isRecipe onClick={() => deleteRecipe(recipeObj.currRecipe._id)}>
                            x
                        </DeleteButton>
                        <StyledLink text="Website" href={recipeObj.currRecipe.URL} />
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
                    <List active={setActive || recipeObj.active} ingredientCount={recipeObj.currRecipe.ingredients.length} isRecipe>
                        <Ul>
                            {!recipeObj.active ? (
                                <>
                                    <Li large key="name">
                                        {recipeObj.currRecipe.name}
                                    </Li>
                                    <Li med key="servings">
                                        Servings: {recipeObj.currRecipe.servings}
                                    </Li>
                                    <Li med key="ingredientCount">
                                        Ingredients: {recipeObj.currRecipe.ingredients.length} &nbsp;&nbsp;
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
                                        Ingredients: {recipeObj.currRecipe.ingredients.length} &nbsp;&nbsp;
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
                <Ingredients recipe={recipe} handleDeleteIngredient={handleDeleteIngredient} handleAddIngredient={handleAddIngredient} />
            </AccordionContent>
        </>
    );
};
