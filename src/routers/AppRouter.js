import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import DashForPuca from "../components/DashForPuca";
import DashFromPuca from "../components/DashFromPuca";
import AddForPuca from "../components/AddForPuca";
import AddFromPuca from "../components/AddFromPuca";
import EditForPuca from "../components/EditForPuca";
import EditFromPuca from "../components/EditFromPuca"
import LoginPage from "../components/LoginPage"
import NotFoundPage from "../components/NotFoundPage";
import PrivateRoute from "./PrivateRoute"
import PublicRoute from "./PublicRoute"

export const history = createHistory()

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true} />
                <PrivateRoute path="/forpuca" component={DashForPuca} exact={true} />
                <PrivateRoute path="/frompuca" component={DashFromPuca} exact={true} />
                <PrivateRoute path="/forpucapromoted" component={DashForPuca} exact={true} />
                <PrivateRoute path="/frompucapromoted" component={DashFromPuca} exact={true} />
                <PrivateRoute path="/forpuca/create" component={AddForPuca} />
                <PrivateRoute path="/frompuca/create" component={AddFromPuca} />
                <PrivateRoute path="/forpucapromoted/create" component={AddForPuca} />
                <PrivateRoute path="/frompucapromoted/create" component={AddFromPuca} />
                <PrivateRoute path="/edit/forpuca/:id" component={EditForPuca} />
                <PrivateRoute path="/edit/frompuca/:id" component={EditFromPuca} />
                <PrivateRoute path="/edit/forpucapromoted/:id" component={EditForPuca} />
                <PrivateRoute path="/edit/frompucapromoted/:id" component={EditFromPuca} />
                <PrivateRoute component={NotFoundPage} />
            </Switch>
        </div>
    </Router> //BrowserRouter hätte auch funktioniert, aber history brauchen wir noch öfter und nicht nur innerhalb von BrowserRouter (ist automatisch dabei)
);

export default AppRouter;
