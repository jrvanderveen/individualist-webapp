import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { List, Input, Button, Wrapper } from "../../elements/index";
import { Ingredient } from "./Ingredient";
import { DropDownButton } from "../util/DropDownButton";
import styled from "styled-components";

const Form = styled.form`
    display: flex;
    flex-flow: row wrap;
    width: 100%;
`;

const Table = styled.table`
    width: 100%;
`;
const TableBody = styled.tbody``;
const TR = styled.tr``;
const TD = styled.td`
    width: 100%;
    padding-left: ${(props) => (props.isRight ? "10px" : "5px")};
`;

export const Ingredients = ({ recipe, handleDeleteIngredient, handleAddIngredient, recipeObj, setRecipeObjFunc }) => {
    // Reducers
    const { addRecipeIngredient, grocerySections } = useContext(GlobalContext);
    // State
    const [newIngredientGrocerySection, setNewIngredientGrocerySection] = useState(grocerySections.default);
    const [newIngredient, setNewIngredient] = useState("");

    // functions
    const onSubmit = (e) => {
        e.preventDefault();

        let newIgredient = {
            name: newIngredient,
            grocerySection: newIngredientGrocerySection,
        };
        addRecipeIngredient(recipe._id, newIgredient);
        setNewIngredient("");
        handleAddIngredient();
    };

    return (
        <ul>
            {recipeObj.recipe.ingredients.map((ingredient, index) => {
                return (
                    <Ingredient
                        key={index}
                        recipeId={recipeObj.recipe._id}
                        ingredient={ingredient}
                        index={index}
                        handleDeleteIngredient={handleDeleteIngredient}
                        recipeObj={recipeObj}
                        setRecipeObjFunc={setRecipeObjFunc}
                    />
                );
            })}
            {recipeObj.active ? null : (
                <List isIngredient isForm>
                    <Form onSubmit={onSubmit}>
                        <Table>
                            <TableBody>
                                <TR>
                                    <TD>
                                        <Input
                                            isIngredient
                                            value={newIngredient}
                                            onChange={(e) => setNewIngredient(e.target.value)}
                                            placeholder="Enter Ingredient..."
                                            required="required"
                                        />
                                    </TD>
                                    <TD isRight>
                                        <Wrapper isGrocerySection>
                                            <DropDownButton
                                                defaultSection={grocerySections.default}
                                                handleChange={setNewIngredientGrocerySection}
                                                sections={grocerySections.sections}
                                                recipeObj={recipeObj}
                                                setRecipeObjFunc={setRecipeObjFunc}
                                            />
                                        </Wrapper>
                                    </TD>
                                </TR>
                                <TR>
                                    <TD colSpan={2}>
                                        <Button type="submit" ingredient>
                                            Save
                                        </Button>
                                    </TD>
                                </TR>
                            </TableBody>
                        </Table>
                    </Form>
                </List>
            )}
        </ul>
    );
};
