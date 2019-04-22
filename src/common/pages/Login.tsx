import {CircularProgress} from "@material-ui/core"
import {parse} from "qs"
import React, {useEffect} from "react"
import useRouter from "use-react-router/use-react-router"
import Auth from "../../client/Auth"

export const Login = () => {
    const {location: {search}} = useRouter()
    useEffect(() => {if(window) Auth.login(true, parse(search.replace("?", "")).redirect || "/")}, [])

    return (
        <CircularProgress/>
    )
}

// noinspection JSUnusedGlobalSymbols
export default Login
