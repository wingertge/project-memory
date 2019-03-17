import React from "react"
import {Route, Redirect} from "react-router"
import {GetProfile} from "../../../generated-models"

interface PropTypes {
    component: any,
    props?: any,
    path: string
}

interface GraphQLPropTypes {
    authenticated: boolean
}

type Props = PropTypes & GraphQLPropTypes

const AuthenticatedRoute = ({component: C, props: cProps, authenticated, ...rest}: Props) => (
    <Route {...rest} render={props =>
        authenticated
            ? <C {...props} {...cProps} />
            : <Redirect to={`/login?redirect=${props.location.pathname}${props.location.search}`} />
    } />
)

const withGQL = GetProfile.HOC<PropTypes, GraphQLPropTypes>({
    props: ({data}) => ({
        authenticated: Boolean(data && data.user)
    })
})

export default withGQL(AuthenticatedRoute)
