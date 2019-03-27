import React from "react"
import {Route, Switch, Redirect} from "react-router"
import Auth from "../client/Auth"
import Loading from "./components/common/Loading"
import AuthenticatedRoute from "./components/routing/AuthenticatedRoute"
import UnauthenticatedRoute from "./components/routing/UnauthenticatedRoute"
import Loadable from "react-loadable"
import DeckDetails from "./pages/DeckDetails"
import TestBed from "./pages/TestBed"

const Home = Loadable({
    loader: () => import("./pages/Home"),
    loading: Loading,
    timeout: 10000
})

const Callback = Loadable({
    loader: () => import("./pages/Callback"),
    loading: Loading,
    timeout: 10000
})

const Settings = Loadable({
    loader: () => import("./pages/Settings"),
    loading: Loading,
    timeout: 10000
})

const Profile = Loadable({
    loader: () => import("./pages/Profile"),
    loading: Loading,
    timeout: 10000
})

const Login = Loadable({
    loader: () => import("./pages/Login"),
    loading: Loading,
    timeout: 10000
})

/*
const DeckDetails = Loadable({
    loader: () => import("./pages/DeckDetails"),
    saving: Loading
})
*/

const NotFound = Loadable({
    loader: () => import("./pages/NotFound"),
    loading: Loading
})

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/callback" component={Callback} />
        <AuthenticatedRoute path="/settings" component={Settings} />
        <AuthenticatedRoute path="/profile" component={Profile} />
        <AuthenticatedRoute path="/user/:username" />
        <AuthenticatedRoute exact path="/deck/:id([a-zA-Z0-9\\-]+)/(page)?/:page([0-9]+)?/(sortBy)?/:sortBy(meaning|pronunciation|translation)?/(sortDirection)?/:sortDirection(asc|desc)?" component={DeckDetails}/>
        <AuthenticatedRoute path="/logout" render={() => {
            if(typeof window === "undefined") { return <Redirect to="/"/> }
            Auth.logout()
        }} />
        <AuthenticatedRoute path="/test" component={TestBed}/>
        <UnauthenticatedRoute path="/login" component={Login}/>
        <Route component={NotFound}/>
    </Switch>
)

export default Routes
