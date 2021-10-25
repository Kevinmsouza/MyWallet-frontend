import "./assets/reset.css"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import SignInPage from "./components/SignInPage"
import UserContext from "./contexts/UserContext"
import { useEffect, useState } from "react";
import SignUpPage from "./components/SignUpPage";
import HomePage from "./components/HomePage"
import NewOpPage from "./components/NewOpPage";

export default function App() {
    const [userData, setUserData] = useState(null);
    
    useEffect(() => {
        const localUserData = localStorage.getItem("userData");
        if (localUserData) {
            setUserData(JSON.parse(localUserData));
        }else{
            setUserData("");
        }
    }, [])

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
                        <HomePage />
                    </Route>
                    <Route path="/new/:type" exact>
                        <NewOpPage />
                    </Route>
                    <Route path="*">
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>
    )
}