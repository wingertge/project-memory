import loadable from "@loadable/component"
import {Router} from "@reach/router"
import React from "react"
import {TimedCircularProgress} from "./components/apollo/TimedCircularProgress"
import Authenticated from "./components/routing/Authenticated"
import Switched from "./components/routing/Switched"
import Unauthenticated from "./components/routing/Unauthenticated"
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
const Logout = loadable(() => import(/* webpackChunkName: "logout" */"./pages/Logout"), {fallback: <TimedCircularProgress />})

const Routes = () => (
    <Router>
        <Switched path="/" render={({authenticated, ...props}) => authenticated ? <Home {...props} /> : <Index {...props} />} />
        <Index path="/landing" />
        <Authenticated path="/intro" component={Intro} />
        <Callback path="/callback" />
        <CMSPage path="/page/:slug" />
        <CMSPage path="/:slug" />
        <Authenticated path="/settings" component={Settings} />
        <Authenticated path="/settings/import-deck/language/:languageCode/nativeLanguage/:nativeLanguageCode/name/:name" component={DeckImport} />
        <Authenticated path="/profile/search/:query*" component={UserSearch} />
        <Authenticated path="/profile/search" component={UserSearch} />
        <Authenticated path="/profile/:id" component={UserProfile} />
        <Authenticated path="/profile" component={UserProfile} />
        <Authenticated path="/deck/:id" component={DeckDetails} />
        <Authenticated path="/deck/:id/page/:page" component={DeckDetails} />
        <Authenticated path="/deck/:id/page/:page/sortBy/:sortBy" component={DeckDetails} />
        <Authenticated path="/deck/:id/page/:page/sortBy/:sortBy/sortDirection/:sortDirection" component={DeckDetails} />
        <Authenticated path="/decks" component={DeckDiscovery} />
        <Authenticated path="/logout" component={Logout} />
        <Authenticated path="/help/board/new" component={EditIssue} />
        <Authenticated path="/help/board/edit/:issueId" component={EditIssue} />
        <Authenticated path="/help/board/:threadId" component={IssueThread} />
        <Authenticated path="/help/board" component={IssuesBoard} />
        <Helpdesk path="/help/:slug" />
        <Helpdesk path="/help" />
        <Authenticated path="/test" component={TestBed} />
        <Authenticated path="/lessons" component={Lessons} />
        <Authenticated path="/reviews" component={Reviews} />
        <Unauthenticated path="/login" component={Login} />
    </Router>
)

export default Routes
