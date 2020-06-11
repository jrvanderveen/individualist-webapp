import React, { useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { H3, Input, Label, Button } from "../../elements/index";

export const AddRecipe = () => {
    const [name, setRecipeName] = useState("");
    const [servings, setServings] = useState(1);
    const [URL, setRecipeURL] = useState("");
    const [errors, setErrors] = useState([]);

    const { addRecipe } = useContext(GlobalContext);
    const { recipes } = useContext(GlobalContext);

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

        const newRecipe = {
            id: Math.floor(Math.random() * 100000000),
            name,
            servings,
            URL,
            ingredients: [],
        };
        addRecipe(newRecipe);
    };

    return (
        <>
            <H3>Add new Recipe</H3>
            <form onSubmit={onSubmit}>
                {errors.map((error) => (
                    <p className="error" key={error}>
                        Error: {error}
                    </p>
                ))}
                <div className="form-group">
                    <Label htmlFor="name">Name</Label>
                    <Input type="text" value={name} onChange={(e) => setRecipeName(e.target.value)} placeholder="Enter Name..." required="required" />
                </div>
                <div className="form-group">
                    <Label htmlFor="amount">Servings</Label>
                    <Input type="number" min="1" value={servings} onChange={(e) => setServings(e.target.value)} placeholder="Enter Servings..." />
                </div>
                <div className="form-group">
                    <Label htmlFor="servings">URL</Label>
                    <Input type="text" value={URL} onChange={(e) => setRecipeURL(e.target.value)} placeholder="Enter URL..." />
                </div>
                <Button isAddRecipeButton>Add Recipe</Button>
            </form>
        </>
    );
};
