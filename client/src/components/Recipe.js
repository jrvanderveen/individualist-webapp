import React, { useContext, useState, useRef } from "react";
import { GlobalContext } from "../context/GlobalState";
import Chevron from "./chevron";

export const Recipe = ({ recipe }) => {
    // Reducers
    const { deleteRecipeIngredient } = useContext(GlobalContext);
    const { deleteRecipe } = useContext(GlobalContext);
    const { addRecipeIngredient } = useContext(GlobalContext);

    // Set/Update state
    const [setActive, setActiveState] = useState("");
    const [setHeight, setHeightState] = useState("0px");
    const [setRotate, setRotateState] = useState("accordion-icon");
    const [ingredient, setIngredient] = useState("");
    const content = useRef(null);

    const name = recipe.name.length > 20 ? `${recipe.name.substring(0, 20)}...` : recipe.name;

    const toggleAccordion = (props) => {
        setActiveState(setActive === "" ? "active" : "");
        setHeightState(setActive === "active" ? "0px" : `${content.current.scrollHeight}px`);
        setRotateState(setActive === "active" ? "accordion-icon" : "accordion-icon rotate");
    };

    const onSubmit = (e) => {
        e.preventDefault();
        addRecipeIngredient(recipe.id, ingredient);
        setIngredient("");
        setHeightState(`${content.current.scrollHeight + content.current.scrollHeight / recipe.ingredients.length}px`);
    };

    return (
        <>
            <div>
                <button className={`accordion-btn ${setActive}`} onClick={toggleAccordion}>
                    <li className={recipe.ingredients.length > 0 ? "positive" : "zero"}>
                        <ul className="recipeAttributes">
                            <li key="name" className="attribute">
                                {name}
                            </li>
                            <li key="servings" className="attribute">
                                Servings: {recipe.servings}
                            </li>
                            <li key="ingredientCount" className="attribute">
                                Ingredients: {recipe.ingredients.length} &nbsp;&nbsp;
                                <Chevron className={`${setRotate}`} width={10} fill={"#777"} />
                            </li>
                        </ul>
                    </li>
                </button>
                <button onClick={() => deleteRecipe(recipe._id)} className="delete-btn">
                    x
                </button>
            </div>

            <div ref={content} style={{ maxHeight: `${setHeight}` }} className="accordion-content">
                <ul className="list">
                    {recipe.ingredients.map((ingredient, index) => {
                        return (
                            <li key={index} className="ingredient">
                                {index + 1}: {ingredient}
                                <button onClick={() => deleteRecipeIngredient(recipe._id, ingredient)} className="delete-ingredient-btn">
                                    x
                                </button>
                            </li>
                        );
                    })}
                    <li className="ingredient">
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    value={ingredient}
                                    onChange={(e) => setIngredient(e.target.value)}
                                    placeholder="Enter Ingredient..."
                                    required="required"
                                />
                            </div>
                        </form>
                    </li>
                </ul>
            </div>
        </>
    );
};
