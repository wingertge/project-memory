import {RouteComponentProps} from "@reach/router"
import React, {ReactElement} from "react"
import {useLoginExpiryQuery} from "../../../generated/graphql"
import {useID} from "../../hooks"

interface PropTypes extends RouteComponentProps<any> {
    render: (props: RouteComponentProps<any> & {authenticated: boolean}) => ReactElement
}

export const Switched = ({render, ...props}: PropTypes) => {
    const id = useID()
    const {data} = useLoginExpiryQuery()
    const authenticated = id !== "" && new Date(data!.loginExpiresAt) >= new Date()

    return render({...props, authenticated})!
}

export default Switched
