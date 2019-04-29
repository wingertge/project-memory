import {CircularProgress} from "@material-ui/core"
import * as React from "react"
import {useEffect, useState} from "react"

interface PropTypes {
    timeout?: number
}

export const TimedCircularProgress = ({timeout = 200}: PropTypes) => {
    const [showLoading, setShowLoading] = useState(false)
    useEffect(() => {
        const handle = setTimeout(() => setShowLoading(true), timeout)
        return () => {
            clearTimeout(handle)
        }
    }, [])

    return showLoading ? <CircularProgress /> : null
}
