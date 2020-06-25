import React, { useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { H3, Input, Label, Button } from "../../elements/index";

/*
    SUMMARY:
        Add new recipe (name, url, servings)

    PARAMS: 

*/
export const AddRecipe = () => {
    // Context
    const { addRecipe } = useContext(GlobalContext);
    const { recipes } = useContext(GlobalContext);

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
            <H3>Add new Recipe</H3>
            <form onSubmit={onSubmit}>
                {errors.map((error) => (
                    <p className="error" key={error}>
                        {error}
                    </p>
                ))}
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
                    <Input type="text" value={URL} onChange={(e) => setRecipeURL(e.target.value)} placeholder="Enter URL..." />
                </div>
                <Button isAddRecipeButton>Add Recipe</Button>
            </form>
        </>
    );
};
