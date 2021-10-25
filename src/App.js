import "./assets/reset.css"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import SignInPage from "./components/SignInPage"
import UserContext from "./contexts/UserContext"
import { useState } from "react";
import SignUpPage from "./components/SignUpPage";

export default function App() {
    const [userData, setUserData] = useState(null);
    return (
        <UserContext.Provider value={{userData, setUserData}}>
            <BrowserRouter>
                <Switch>
                    <Route path="/sign-up" exact>
                        <SignUpPage />
                    </Route>
                    <Route path="/sign-in" exact>
                        <SignInPage />
                    </Route>
                    <Route path="/" exact>

                    </Route>
                    <Route path="/new" exact>

                    </Route>
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>
    )
}