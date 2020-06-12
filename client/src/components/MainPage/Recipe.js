import React, { useContext, useState, useRef } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { Ingredients } from "./Ingredients";
import Chevron from "./chevron";
import { List, AccordionButton, Wrapper, DeleteButton, Link, AccordionContent } from "../../elements/index";
import styled from "styled-components";
import { SelectRecipeButton } from "./SelectRecipeButton";

const Ul = styled.ul`
    width: 100%;
    list-style: none;
`;

const Li = styled.li`
    float: left;
    width: 33%;
`;

const StyledLink = styled(Link)`
    color: blue;
    font-size: 75%;
`;

export const Recipe = ({ recipe }) => {
    // Reducers
    const { deleteRecipe } = useContext(GlobalContext);

    // Set/Update state
    const [setActive, setActiveState] = useState("");
    const [setHeight, setHeightState] = useState("0px");
    const [setRotate, setRotateState] = useState("");
    const content = useRef(null);
    const name = recipe.name.length > 20 ? `${recipe.name.substring(0, 20)}...` : recipe.name;

    const toggleAccordion = (props) => {
        setActiveState(setActive === "" ? "active" : "");
        setHeightState(setActive === "active" ? "0px" : `${content.current.scrollHeight}px`);
        setRotateState(setActive === "active" ? "" : "rotate");
    };

    const handleDeleteIngredient = () => {
        setHeightState(`${content.current.scrollHeight - 70.833333}px`);
    };
    const handleAddIngredient = () => {
        setHeightState(`${content.current.scrollHeight + 70.833333}px`);
    };

    return (
        <>
            <Wrapper>
                <SelectRecipeButton active={recipe.forShoppingList} recipe_id={recipe._id} />
                <DeleteButton isRecipe onClick={() => deleteRecipe(recipe._id)}>
                    x
                </DeleteButton>
                <StyledLink text="Website" href={recipe.URL} />
                <AccordionButton active={setActive} onClick={toggleAccordion}>
                    <List ingredientCount={recipe.ingredients.length} isRecipe>
                        <Ul>
                            <Li key="name">{name}</Li>
                            <Li key="servings">Servings: {recipe.servings}</Li>
                            <Li key="ingredientCount">
                                Ingredients: {recipe.ingredients.length} &nbsp;&nbsp;
                                <Chevron rotate={setRotate} />
                            </Li>
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
