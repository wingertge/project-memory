import {StyleRulesCallback, withStyles as withStylesBase} from "@material-ui/core"
import {withRouter as withRouterBase} from "react-router"
import {StyleRules, WithStylesOptions} from "@material-ui/core/styles/withStyles"
import * as React from "react"
import {RouteComponentProps} from "react-router"

/**
 * withStyles cast as any to support typescript's stupid decorator requirements
 * @param style
 * @param options
 */
export function withStyles<
    ClassKey extends string,
    Options extends WithStylesOptions<ClassKey> = {}
    >(
    style: StyleRulesCallback<ClassKey> | StyleRules<ClassKey>,
    options?: Options,
) {
    return withStylesBase(style, options) as any
}

/**
 * withRouter cast as any to support typescript's stupid decorator requirements
 * @param component
 */
export function withRouter<P extends RouteComponentProps<any>>(component: React.ComponentType<P>) {
    return withRouterBase(component) as any
}
