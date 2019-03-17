import React, {ComponentType} from "react"
import * as PropTypes from "prop-types"
import {Route, Redirect, RouteProps} from "react-router"
import {oc} from "ts-optchain"
import {GetProfile} from "../../../generated-models"

interface PropTypes {
    component: ComponentType<any>,
    props?: object
}

interface GraphQLPropTypes {
    authenticated: boolean
}

type Props = RouteProps & GraphQLPropTypes & PropTypes

const UnauthenticatedRoute = ({component: C, props: cProps, authenticated, ...rest}: Props) => {
    return (
        <Route {...rest} render={props =>
            !authenticated
                ? <C {...props} {...cProps} />
                : <Redirect to="/" />
        } />
    )
}

const withGQL = GetProfile.HOC<RouteProps & PropTypes, GraphQLPropTypes>({
    props: ({data}) => ({
        authenticated: !!(oc(data).user())
    }),
    options: {
        errorPolicy: "ignore"
    }
})

export default withGQL(UnauthenticatedRoute)
