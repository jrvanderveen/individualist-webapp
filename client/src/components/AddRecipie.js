import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const AddRecipie = () => {
    const [name, setRecipieName] = useState("");
    const [servings, setServings] = useState(1);
    const [URL, setRecipieURL] = useState("");
    const [errors, setErrors] = useState([]);

    const { addRecipie } = useContext(GlobalContext);
    const { recipies } = useContext(GlobalContext);

    const onSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        const errors = [];
        recipies.forEach((recipie) => {
            if (recipie.name === name) {
                console.log("non unique name");
                errors.push("Recipie name must be unique");
                return;
            }
        });
        if (errors.length > 0) {
            setErrors(errors);
            return;
        }

        const newRecipie = {
            id: Math.floor(Math.random() * 100000000),
            name,
            servings,
            URL,
            ingredients: ["Salt", "Pepper"],
        };
        addRecipie(newRecipie);
    };

    return (
        <>
            <h3>Add new Recipie</h3>
            <form onSubmit={onSubmit}>
                {errors.map((error) => (
                    <p className="error" key={error}>
                        Error: {error}
                    </p>
                ))}
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" value={name} onChange={(e) => setRecipieName(e.target.value)} placeholder="Enter Name..." required="required" />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Servings</label>
                    <input type="number" min="1" value={servings} onChange={(e) => setServings(e.target.value)} placeholder="Enter Servings..." />
                </div>
                <div className="form-group">
                    <label htmlFor="servings">URL</label>
                    <input type="text" value={URL} onChange={(e) => setRecipieURL(e.target.value)} placeholder="Enter URL..." />
                </div>
                <button className="btn">Add Recipie</button>
            </form>
        </>
    );
};
