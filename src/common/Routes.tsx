import loadable from "@loadable/component"
import React from "react"
import {Route, Switch, Redirect} from "react-router"
import Auth from "../client/Auth"
import {TimedCircularProgress} from "./components/apollo/TimedCircularProgress"
import AuthenticatedRoute from "./components/routing/AuthenticatedRoute"
import {SwitchedRoute} from "./components/routing/SwitchedRoute"
import UnauthenticatedRoute from "./components/routing/UnauthenticatedRoute"
import TestBed from "./pages/TestBed"

const Home = loadable(() => import(/* webpackChunkName: "home" */"./pages/Home"), {fallback: <TimedCircularProgress />})
const Callback = loadable(() => import(/* webpackChunkName: "callback" */"./pages/Callback"), {fallback: <TimedCircularProgress />})
const Settings = loadable(() => import(/* webpackChunkName: "settings" */"./pages/Settings"), {fallback: <TimedCircularProgress />})
const UserProfile = loadable(() => import(/* webpackChunkName: "profile" */"./pages/UserProfile"), {fallback: <TimedCircularProgress />})
const Login = loadable(() => import(/* webpackChunkName: "login" */"./pages/Login"), {fallback: <TimedCircularProgress />})
const Lessons = loadable(() => import(/* webpackChunkName: "lessons" */"./pages/Lessons"), {fallback: <TimedCircularProgress />})
const DeckDetails = loadable(() => import(/* webpackChunkName: "deck" */"./pages/DeckDetails"), {fallback: <TimedCircularProgress />})
const Intro = loadable(() => import(/* webpackChunkName: "intro" */"./pages/Intro"), {fallback: <TimedCircularProgress />})
const Reviews = loadable(() => import(/* webpackChunkName: "reviews" */"./pages/Reviews"), {fallback: <TimedCircularProgress />})
const DeckDiscovery = loadable(() => import(/* webpackChunkName: "decks" */"./pages/DeckDiscovery"), {fallback: <TimedCircularProgress />})
const UserSearch = loadable(() => import(/* webpackChunkName: "user-search" */"./pages/UserSearch"), {fallback: <TimedCircularProgress />})
const CMSPage = loadable(() => import(/* webpackChunkName: "cms-page" */"./pages/CMSPage"), {fallback: <TimedCircularProgress />})
const Index = loadable(() => import(/* webpackChunkName: "landing" */"./pages/Index"), {fallback: <TimedCircularProgress />})
const Helpdesk = loadable(() => import(/* webpackChunkName: "help" */"./pages/Helpdesk"), {fallback: <TimedCircularProgress />})
const IssuesBoard = loadable(() => import(/* webpackChunkName: "help-board" */"./pages/IssuesBoard"), {fallback: <TimedCircularProgress />})
const EditIssue = loadable(() => import(/* webpackChunkName: "help-board-edit" */"./pages/IssuesBoard/EditIssue"), {fallback: <TimedCircularProgress />})
const IssueThread = loadable(() => import(/* webpackChunkName: "help-board-thread" */"./pages/IssuesBoard/IssueThread"), {fallback: <TimedCircularProgress />})
const DeckImport = loadable(() => import(/* webpackChunkName: "deck-import" */"./pages/DeckImport"), {fallback: <TimedCircularProgress />})

const Routes = () => (
    <Switch>
        <SwitchedRoute exact path="/" authenticatedComponent={Home} unauthenticatedComponent={Index} />
        <Route path="/landing" component={Index} />
        <AuthenticatedRoute path="/intro" component={Intro} />
        <Route path="/callback" component={Callback} />
        <Route path="/page/:slug*" component={CMSPage} />
        <AuthenticatedRoute path="/settings/import-deck/language/:languageCode/name/:name" component={DeckImport} />
        <AuthenticatedRoute path="/settings" component={Settings} />
        <AuthenticatedRoute path="/profile/search/:query*" component={UserSearch} />
        <AuthenticatedRoute path="/profile/:id([a-zA-Z0-9]+)?" component={UserProfile} />
        <AuthenticatedRoute exact path="/deck/:id([a-zA-Z0-9\\-]+)/(page)?/:page([0-9]+)?/(sortBy)?/:sortBy(meaning|pronunciation|translation)?/(sortDirection)?/:sortDirection(asc|desc)?" component={DeckDetails}/>
        <AuthenticatedRoute path="/decks" component={DeckDiscovery} />
        <AuthenticatedRoute path="/logout" render={() => {
            if(typeof window === "undefined") { return <Redirect to="/"/> }
            Auth.logout()
        }} />
        <AuthenticatedRoute path="/help/board/new" component={EditIssue} />
        <AuthenticatedRoute path="/help/board/edit/:issueId" component={EditIssue} />
        <AuthenticatedRoute path="/help/board/:threadId" component={IssueThread} />
        <AuthenticatedRoute path="/help/board" component={IssuesBoard} />
        <Route path="/help/:slug*" component={Helpdesk} />
        <AuthenticatedRoute path="/test" component={TestBed} />
        <AuthenticatedRoute path="/lessons" component={Lessons} />
        <AuthenticatedRoute path="/reviews" component={Reviews} />
        <UnauthenticatedRoute path="/login" component={Login} />
        <Route path="/:slug" component={CMSPage} />
    </Switch>
)

export default Routes
