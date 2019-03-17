import React from "react"
import {Route, Switch, Redirect} from "react-router"
import Auth from "../client/Auth"
import AuthenticatedRoute from "./components/routing/AuthenticatedRoute"
import Callback from "./pages/Callback"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
/*
const Home = Loadable({
    loader: () => import("./pages/Home"),
    loading: Loading,
    timeout: 10000,
    modules: ["./pages/Home"],
    webpack: () => [Number(require.resolveWeak("./pages/Home"))]
})

const Callback = Loadable({
    loader: () => import("./pages/Callback"),
    loading: Loading,
    timeout: 10000,
    modules: ["./pages/Callback"],
    webpack: () => [Number(require.resolveWeak("./pages/Callback"))]
})

const Profile = Loadable({
    loader: () => import("./pages/Profile"),
    loading: Loading,
    timeout: 10000,
    modules: ["./pages/Callback"],
    webpack: () => [Number(require.resolveWeak("./pages/Callback"))]
})*/

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/callback" component={Callback} />
        <AuthenticatedRoute path="/profile" component={Profile} />
        <AuthenticatedRoute path="/logout" component={() => {
            if(typeof window === "undefined") { return <Redirect to="/"/> }
            Auth.logout()
        }} />
    </Switch>
)

export default Routes
