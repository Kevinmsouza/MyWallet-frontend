import "./assets/reset.css"
import { BrowserRouter, Switch, Route } from "react-router-dom"

export default function App () {
    return(
        <BrowserRouter>
        <Switch>
            <Route path="/sign-up" exact>
                
            </Route>
            <Route path="/sing-in" exact>

            </Route>
            <Route path="/" exact>

            </Route>
            <Route path="/new" exact>

            </Route>
        </Switch>
        </BrowserRouter>
    )
}