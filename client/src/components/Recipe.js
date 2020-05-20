import React, { useContext, useState, useRef } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Ingredient } from "./Ingredient";
import Chevron from "./chevron";
import { List, AccordionButton, Wrapper, DeleteButton, Input } from "../elements/index";
import styled from "styled-components";

const Ul = styled.ul`
    width: 100%;
    list-style: none;
`;
const Li = styled.li`
    float: left;
    width: 33%;
`;

const AccordionContent = styled.div`
    overflow: hidden;
    transition: max-height 0.3s ease;
    max-height: ${(props) => props.maxHeight};
`;

export const Recipe = ({ recipe }) => {
    // Reducers
    const { deleteRecipe } = useContext(GlobalContext);
    const { addRecipeIngredient } = useContext(GlobalContext);

    // Set/Update state
    const [setActive, setActiveState] = useState("");
    const [setHeight, setHeightState] = useState("0px");
    const [setRotate, setRotateState] = useState("");
    const [ingredient, setIngredient] = useState("");
    const content = useRef(null);
    const name = recipe.name.length > 20 ? `${recipe.name.substring(0, 20)}...` : recipe.name;

    const toggleAccordion = (props) => {
        setActiveState(setActive === "" ? "active" : "");
        setHeightState(setActive === "active" ? "0px" : `${content.current.scrollHeight}px`);
        setRotateState(setActive === "active" ? "" : "rotate");
    };

    const onSubmit = (e) => {
        e.preventDefault();
        addRecipeIngredient(recipe._id, ingredient);
        setIngredient("");
        //On submit will create another ingredient so need to set height to content height + 1 so create ingredient LI appears
        setHeightState(`${content.current.scrollHeight + content.current.scrollHeight / (recipe.ingredients.length + 1)}px`);
    };

    return (
        <>
            <Wrapper className="Accordion Wrapper">
                <AccordionButton className="Accordion Button" active={setActive} onClick={toggleAccordion}>
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
                <DeleteButton isRecipe onClick={() => deleteRecipe(recipe._id)}>
                    x
                </DeleteButton>
            </Wrapper>

            <AccordionContent ref={content} maxHeight={setHeight} className="Accordion Content">
                <ul className="list">
                    {recipe.ingredients.map((ingredient, index) => {
                        return <Ingredient key={index} recipeId={recipe._id} ingredient={ingredient} index={index + 1} />;
                    })}
                    <List isIngredient>
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <Input
                                    className="form-control"
                                    value={ingredient}
                                    onChange={(e) => setIngredient(e.target.value)}
                                    placeholder="Enter Ingredient..."
                                    required="required"
                                />
                            </div>
                        </form>
                    </List>
                </ul>
            </AccordionContent>
        </>
    );
};
