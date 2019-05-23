import * as React from "react"
import {useEffect} from "react"
import {TimedCircularProgress} from "../components/apollo/TimedCircularProgress"

export const Logout = () => {
    useEffect(() => {
        if(typeof window !== "undefined") {
            import("../../client/auth").then(auth => auth.logout())
        }
    }, [])

    return <TimedCircularProgress />
}

export default Logout
