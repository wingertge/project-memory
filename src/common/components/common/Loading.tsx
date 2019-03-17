import {CircularProgress} from "@material-ui/core"
import * as React from "react"
import ErrorBox from "./ErrorBox"

interface PropTypes {
    error: boolean
    retry: (event) => void
    pastDelay: boolean
    timedOut: boolean
}

export default ({error, retry, pastDelay, timedOut}: PropTypes) => {
    if(error || timedOut) {
        return <ErrorBox title="Error!" text="Some error happened" retry={retry}/>
    } else if(pastDelay) {
        return <CircularProgress />
    } else {
        return null
    }
}
