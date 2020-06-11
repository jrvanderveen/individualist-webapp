import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { List, Input, Button, Wrapper } from "../../elements/index";
import { Ingredient } from "./Ingredient";
import { DropDownButton } from "./DropDownButton";
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

export const Ingredients = ({ recipe, handleDeleteIngredient, handleAddIngredient }) => {
    // State
    const [grocerySection, setGrocerySection] = useState("Other");
    const [ingredient, setIngredient] = useState("");
    // Reducers
    const { addRecipeIngredient } = useContext(GlobalContext);
    // functions

    const onSubmit = (e) => {
        e.preventDefault();
        var newIgredient = {
            name: ingredient,
            grocerySection: grocerySection,
        };
        addRecipeIngredient(recipe._id, newIgredient);
        setIngredient("");
        handleAddIngredient();
    };

    return (
        <ul>
            {recipe.ingredients.map((ingredient, index) => {
                return (
                    <Ingredient key={index} recipeId={recipe._id} ingredient={ingredient} index={index + 1} handleDeleteIngredient={handleDeleteIngredient} />
                );
            })}
            <List isIngredient className="New Ingredient List">
                <Form onSubmit={onSubmit}>
                    <Table>
                        <TableBody>
                            <TR>
                                <TD>
                                    <Input
                                        isIngredient
                                        value={ingredient}
                                        onChange={(e) => setIngredient(e.target.value)}
                                        placeholder="Enter Ingredient..."
                                        required="required"
                                    />
                                </TD>
                                <TD isRight>
                                    <Wrapper grocerySection className="Grocery Section DropDown Wrapper">
                                        <DropDownButton default="Other" handleChange={setGrocerySection} />
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
        </ul>
    );
};
