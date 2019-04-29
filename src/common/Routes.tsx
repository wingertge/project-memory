import React from "react"
import {Route, Switch, Redirect} from "react-router"
import Auth from "../client/Auth"
import Loading from "./components/common/Loading"
import AuthenticatedRoute from "./components/routing/AuthenticatedRoute"
import UnauthenticatedRoute from "./components/routing/UnauthenticatedRoute"
import Loadable from "react-loadable"
import TestBed from "./pages/TestBed"

const Home = Loadable({
    loader: () => import("./pages/Home/Home"),
    loading: Loading,
    timeout: 10000
})

const Callback = Loadable({
    loader: () => import("./pages/Callback"),
    loading: Loading,
    timeout: 10000
})

const Settings = Loadable({
    loader: () => import("./pages/Settings/Settings"),
    loading: Loading,
    timeout: 10000
})

const UserProfile = Loadable({
    loader: () => import("./pages/UserProfile"),
    loading: Loading,
    timeout: 10000
})

const Login = Loadable({
    loader: () => import("./pages/Login"),
    loading: Loading,
    timeout: 10000
})

const Lessons = Loadable({
    loader: () => import("./pages/Lessons/Lessons"),
    loading: Loading,
    timeout: 1000
})

const DeckDetails = Loadable({
    loader: () => import("./pages/DeckDetails"),
    loading: Loading
})

const NotFound = Loadable({
    loader: () => import("./pages/NotFound"),
    loading: Loading
})

const Intro = Loadable({
    loader: () => import("./pages/Intro"),
    loading: Loading
})

const Reviews = Loadable({
    loader: () => import("./pages/Reviews"),
    loading: Loading
})

const DeckDiscovery = Loadable({
    loader: () => import("./pages/DeckDiscovery"),
    loading: Loading
})

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <AuthenticatedRoute path="/intro" component={Intro} />
        <Route path="/callback" component={Callback} />
        <AuthenticatedRoute path="/settings" component={Settings} />
        <AuthenticatedRoute path="/profile/:id([a-zA-Z0-9]+)?" component={UserProfile} />
        <AuthenticatedRoute exact path="/deck/:id([a-zA-Z0-9\\-]+)/(page)?/:page([0-9]+)?/(sortBy)?/:sortBy(meaning|pronunciation|translation)?/(sortDirection)?/:sortDirection(asc|desc)?" component={DeckDetails}/>
        <AuthenticatedRoute path="/decks" component={DeckDiscovery} />
        <AuthenticatedRoute path="/logout" render={() => {
            if(typeof window === "undefined") { return <Redirect to="/"/> }
            Auth.logout()
        }} />
        <AuthenticatedRoute path="/test" component={TestBed} />
        <AuthenticatedRoute path="/lessons" component={Lessons} />
        <AuthenticatedRoute path="/reviews" component={Reviews} />
        <UnauthenticatedRoute path="/login" component={Login} />
        <Route component={NotFound}/>
    </Switch>
)

export default Routes
