import React, { useState, useContext } from "react";
import { GlobalContext } from "../../context/globalState";
import { H3, Input, Label, Button } from "../../elements/index";
import styled from "styled-components";

// Styled Components
const HiddenInput = styled.input`
    height: 0px;
    opacity: 0;
`;
/*
    SUMMARY:
        Add new recipe (name, url, servings)

    PARAMS: 

*/
export const AddRecipe = () => {
    // Context
    const { addRecipe, recipes, postMessage } = useContext(GlobalContext);

    // State
    const [name, setRecipeName] = useState("");
    const [servings, setServings] = useState(1);
    const [URL, setRecipeURL] = useState("");
    const [errors, setErrors] = useState([]);

    // Functions
    // On submit check for validation errors, post recipe, reset state
    const onSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        const errors = [];
        Object.entries(recipes).forEach(([_id, recipe]) => {
            if (recipe.name === name) {
                errors.push("Recipe name must be unique");
                return;
            }
        });
        if (errors.length > 0) {
            setErrors(errors);
            return;
        }
        let url = URL;
        if (!/^https?:\/\//i.test(url)) {
            url = "http://" + url;
        }
        const newRecipe = {
            name,
            servings,
            URL: url,
            ingredients: [],
        };
        addRecipe(newRecipe);
        setRecipeName("");
        setServings(1);
        setRecipeURL("");
    };

    // New recipe form (no ingredients added at start)
    return (
        <>
            {/* This HiddenInput is really bad.. without it when opening the bottom recipe it will overflow onto the add recipe but does not when there is this hidden input. */}
            <HiddenInput disabled />
            <H3 addRecipe>Add new Recipe</H3>
            <form onSubmit={onSubmit}>
                {errors.map((error) => (
                    <p className="error" key={error}>
                        {error}
                    </p>
                ))}
                {postMessage !== "" ? <p className="error">{postMessage}</p> : null}
                <div>
                    <Label>Name</Label>
                    <Input type="text" value={name} onChange={(e) => setRecipeName(e.target.value)} placeholder="Enter Name..." required="required" />
                </div>
                <div>
                    <Label>Servings</Label>
                    <Input type="number" min="1" max="99" value={servings} onChange={(e) => setServings(e.target.value)} placeholder="Enter Servings..." />
                </div>
                <div>
                    <Label>URL</Label>
                    <Input
                        type="text"
                        value={URL}
                        onChange={(e) => setRecipeURL(e.target.value)}
                        placeholder="Automatically adds ingredients from popular sites"
                    />
                </div>
                <Button isAddRecipeButton>Add Recipe</Button>
            </form>
        </>
    );
};
