import React, { useContext, useState, useRef } from "react";
import { GlobalContext } from "../context/GlobalState";
import Chevron from "./chevron";

export const Recipie = ({ recipie }) => {
    // Reducers
    const { deleteRecipieIngredient } = useContext(GlobalContext);
    const { deleteRecipie } = useContext(GlobalContext);
    const { addRecipieIngredient } = useContext(GlobalContext);

    // Set/Update state
    const [setActive, setActiveState] = useState("");
    const [setHeight, setHeightState] = useState("0px");
    const [setRotate, setRotateState] = useState("accordion-icon");
    const [ingredient, setIngredient] = useState("");
    const content = useRef(null);

    const name = recipie.name.length > 20 ? `${recipie.name.substring(0, 20)}...` : recipie.name;

    const toggleAccordion = (props) => {
        setActiveState(setActive === "" ? "active" : "");
        setHeightState(setActive === "active" ? "0px" : `${content.current.scrollHeight}px`);
        setRotateState(setActive === "active" ? "accordion-icon" : "accordion-icon rotate");
    };

    const onSubmit = (e) => {
        e.preventDefault();
        addRecipieIngredient(recipie.id, ingredient);
        setIngredient("");
        setHeightState(`${content.current.scrollHeight + content.current.scrollHeight / recipie.ingredients.length}px`);
    };

    return (
        <>
            <div>
                <button className={`accordion-btn ${setActive}`} onClick={toggleAccordion}>
                    <li className={recipie.ingredients.length > 0 ? "positive" : "zero"}>
                        <ul className="recipieAttributes">
                            <li key="name" className="attribute">
                                {name}
                            </li>
                            <li key="servings" className="attribute">
                                Servings: {recipie.servings}
                            </li>
                            <li key="ingredientCount" className="attribute">
                                Ingredients: {recipie.ingredients.length} &nbsp;&nbsp;
                                <Chevron className={`${setRotate}`} width={10} fill={"#777"} />
                            </li>
                        </ul>
                    </li>
                </button>
                <button onClick={() => deleteRecipie(recipie.id)} className="delete-btn">
                    x
                </button>
            </div>

            <div ref={content} style={{ maxHeight: `${setHeight}` }} className="accordion-content">
                <ul className="list">
                    {recipie.ingredients.map((ingredient, index) => {
                        return (
                            <li key={index} className="ingredient">
                                {index + 1}: {ingredient}
                                <button onClick={() => deleteRecipieIngredient(recipie.id, ingredient)} className="delete-ingredient-btn">
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
