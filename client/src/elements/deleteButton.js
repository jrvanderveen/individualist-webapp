import styled from "styled-components";
import Wrapper from "./wrapper";

export default styled.button`
    cursor: pointer;
    background-color: #e74c3c;
    border: 0;
    color: #fff;
    font-size: 20px;
    line-height: 20px;
    padding: 2px 5px;
    opacity: 0;
    transition: opacity 0.3s ease;
    ${Wrapper}:hover & {
        opacity: 1;
    }

    position: ${(props) => props.isIngredient && "absolute"};
    top: 0px;
    right: 0px;
    transform: ${(props) => (props.isIngredient || props.isGrocerySection ? "translate(100%, 50%)" : "translate(100%, 250%)")};
    @media (max-width: 1199px) {
        opacity: 1;
        float: left;
    }
`;
/* 
    position: ${(props) => (props.isIngredient ? "absolute" : "relative")};  else recpe *
    transform: ${(props) => (props.isIngredient ? "translate(-170%, -0%)" : "translate(-100%, -170%)")}; else recpe
    */
