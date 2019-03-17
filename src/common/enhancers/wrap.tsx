import * as React from "react"
import {ComponentType} from "react"

/*export const wrapWith = (WrapperComponent: ComponentType) => (BaseComponent: ComponentType) => (children, ...restProps) => (
    <WrapperComponent>
        <BaseComponent {...restProps}>
            {children}
        </BaseComponent>
    </WrapperComponent>
)*/

export const add = (AddedComponent: ComponentType) => (BaseComponent: ComponentType) => ({children, ...restProps}) => (
    <>
        <BaseComponent {...restProps}>
            {children}
        </BaseComponent>
        <AddedComponent />
    </>
)
