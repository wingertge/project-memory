import {navigate, RouteComponentProps} from "@reach/router"
import {parse} from "qs"
import React, {useEffect} from "react"
import {TimedCircularProgress} from "../components/apollo/TimedCircularProgress"

export const Callback = ({location}: RouteComponentProps) => {
    useEffect(() => {
        const query = parse(location!.search.replace("?", ""))
        const redirectTo = query.state.replace(/"/g, "").replace("#", "")
        navigate(redirectTo)
    }, [])

    return <TimedCircularProgress />
}

// noinspection JSUnusedGlobalSymbols
export default Callback
