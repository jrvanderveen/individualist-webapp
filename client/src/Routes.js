import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./context/globalState";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { MainPage } from "./pages/mainPage";
import { Login } from "./pages/login";
import { NotFound } from "./pages/404";
import { Settings } from "./pages/settings";

/*
    SUMMARY:
        Routes encapsulated by the global providor
        
    PARAMS: 

*/
export const Routes = () => {
    //Context
    const { isUserSignedIn, loggedIn } = useContext(GlobalContext);

    //State
    const [render, setRender] = useState(false);

    // Functions
    // Wait to hear back about user status before rendering page
    // no one wants to see a flash of the main page before being routed to the login
    useEffect(() => {
        isUserSignedIn().then(() => {
            setRender(true);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // New recipe form (no ingredients added at start)
    if (render) {
        return (
            <Router>
                {!loggedIn ? (
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/" component={Login} />
                        <Route exact path="/settings" component={Login} />
                        <Route exact path="/404" component={Login} />
                        <Redirect to="/404" />
                    </Switch>
                ) : (
                    <Switch>
                        <Route exact path="/login" component={MainPage} />
                        <Route exact path="/" component={MainPage} />
                        <Route exact path="/settings" component={Settings} />
                        <Route exact path="/404" component={NotFound} />
                        <Redirect to="/404" />
                    </Switch>
                )}
            </Router>
        );
    } else {
        return <></>;
    }
};
