import React, { useState, useContext } from "react";
import { GlobalContext } from "../../context/globalState";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

const Span = styled.span`
    color: blue;
    font-size: 80%;
    &:hover {
        cursor: pointer;
    }
    margin-bottom: 5px;
`;
const Wrapper = styled.div`
    text-align: center;
`;
const OAuthWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    @media (max-width: 500px) {
        flex-direction: column;
    }
`;
const ButtonWrapper = styled.div`
    margin: 5px;
`;
/*
    SUMMARY:
        Page to allow users to chose between creating an account and loging in

    PARAMS: 
        setLogInStateFunc: switch between sign in and sign up form
*/
export const SignIn = ({ setLogInStateFunc }) => {
    // Context
    const { signIn } = useContext(GlobalContext);

    // State
    const [username, setUserName] = useState("");
    const [placeholder, setPlaceHolder] = useState("username");
    const [password, setPassword] = useState("");

    // Functions
    const onSubmit = (e) => {
        e.preventDefault();
        signIn({ username: username, password: password }).then((result) => {
            if (!result) {
                setUserName("");
                setPlaceHolder("invalid user/password");
                setPassword("");
            } else {
                return <Redirect to="/" />;
            }
        });
    };

    const onClick = () => {
        signIn({ username: "guest", password: "guest" }).then((result) => {
            if (!result) {
                setUserName("");
                setPlaceHolder("invalid user/password");
                setPassword("");
            } else {
                return <Redirect to="/" />;
            }
        });
    };
    return (
        <Wrapper>
            <form className="form-signin" onSubmit={onSubmit}>
                <h1 className="h3 mb-3 font-weight-normal"> Sign in</h1>
                <OAuthWrapper>
                    <ButtonWrapper>
                        <a className="btn facebook-btn social-btn" href="http://localhost:5000/api/v1.1/login/facebook">
                            <span>
                                <i className="fab fa-facebook-f"></i> Sign in with Facebook
                            </span>{" "}
                        </a>
                    </ButtonWrapper>
                    <ButtonWrapper>
                        <a className="btn google-btn social-btn" href="http://localhost:5000/api/v1.1/login/google">
                            <span>
                                <i className="fab fa-google-plus-g"></i> Sign in with Google+
                            </span>{" "}
                        </a>
                    </ButtonWrapper>
                </OAuthWrapper>
                <p style={{ textAlign: "center" }}> OR </p>
                <Span onClick={onClick}>Sign In As Guest</Span>
                <input
                    type="username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    className="form-control"
                    placeholder={placeholder}
                    required="required"
                    autoFocus
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Password..."
                    required="required"
                />

                <button className="btn btn-success btn-block" type="submit">
                    <i className="fas fa-sign-in-alt"></i> Sign in
                </button>
                <hr />
                <button className="btn btn-primary btn-block" onClick={() => setLogInStateFunc("signup")}>
                    Sign up New Account
                </button>
            </form>
        </Wrapper>
    );
};
