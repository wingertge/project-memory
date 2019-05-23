/*
The following is the license for the Project Memory Frontend, a frontend for the Project Memory web app.
Copyright (C) 2019  Genna Wingert

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/* tslint:disable:object-literal-key-quotes */
import {Typography} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/styles"
import clsx from "clsx"
import debug from "debug"
import GraphImg from "graphcms-image"
import * as React from "react"
import {useTranslation} from "react-i18next"
import v4 from "uuid/v4"
import {Theme} from "../../theme"
import {Link as RouterLink} from "@reach/router"
import {Link as A} from "@material-ui/core"

interface DocumentTree {
    nodes: Node[]
}

interface Node {
    object: string,
    type: string,
    data: {} | ImageData | LinkData,
    nodes?: Node[]
    leaves?: Leaf[]
}

interface Leaf {
    object: string,
    text: string,
    marks?: Mark[]
}

interface ImageData {
    src: string,
    title: string,
    mimeType: string,
    width: number,
    height: number,
    handle: string
}

interface Mark {
    object: string,
    type: string,
    data: {}
}

interface LinkData {
    href: string
}

interface PropTypes {
    raw: {document: DocumentTree},
    linkComponent?: any
    externalLinkComponent?: any
}

interface RendererPropTypes extends Node {
    components: {
        link: any
        externalLink: any
    }
}

const log = debug("app:RichText")

const HeadingOne = ({nodes}: RendererPropTypes) => {
    const {t} = useTranslation("cms")

    return nodes!.some(({leaves}) => leaves!.some(({text}) => text !== "")) && nodes!.map(({leaves}) => (
        <div key={v4()}>
            {leaves!.map(({text}) => text !== "" && (
                <Typography variant="h5" key={v4()}>{t(text)}</Typography>
            ))}
        </div>
    ))
}

const HeadingTwo = ({nodes}: RendererPropTypes) => {
    const {t} = useTranslation("cms")

    return nodes!.some(({leaves}) => leaves!.some(({text}) => text !== "")) && nodes!.map(({leaves}) => (
        <div key={v4()}>
            {leaves!.map(({text}) => text !== "" && (
                <Typography variant="h6" key={v4()}>{t(text)}</Typography>
            ))}
        </div>
    ))
}

const Paragraph = ({nodes, components}: RendererPropTypes) => (
    <div style={{minHeight: "1rem"}} className="paragraph">
        {nodes!.map(node => renderNode({...node, components}))}
    </div>
)

const Image = ({data, nodes, components}: RendererPropTypes) => {
    const {width, height} = data as ImageData

    return (
        <div>
            <GraphImg image={data} alt="Image" style={{maxWidth: width, maxHeight: height, margin: "32px auto"}} />
            {nodes!.map(node => renderNode({...node, components}))}
        </div>
    )
}

const Link = ({data, nodes, components}: RendererPropTypes) => {
    const {href} = data as LinkData
    const isLocal = href.startsWith("https://www.project-memory.org")
    const link = isLocal ? href.split("www.project-memory.org")[1] : href
    const content = nodes!.map(node => renderNode({...node, components}))
    const Component = components.link
    const ExternalComponent = components.externalLink

    return content.length !== 0 && isLocal ? (
        <Component to={link}>{content}</Component>
    ) : <ExternalComponent href={link} variant="contained" color="primary">{content}</ExternalComponent>
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    all: {
        display: "inline"
    },
    underlined: {
        textDecoration: "underline"
    },
    bold: {
        fontWeight: "bold"
    },
    italic: {
        fontStyle: "italic"
    },
    code: {
        fontFamily: theme.typography.fontFamilyCode
    }
}))

const Text = ({leaves}: RendererPropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation("cms")

    return (
        <>
            {leaves!.map(({text, marks}) => {
                marks = marks || []
                const decoratorClasses = {
                    [classes.underlined]: marks.some(({type}) => type === "underlined"),
                    [classes.bold]: marks.some(({type}) => type === "bold"),
                    [classes.italic]: marks.some(({type}) => type === "italic"),
                    [classes.code]: marks.some(({type}) => type === "code")
                }

                return (
                    <Typography key={v4()} className={clsx(classes.all, decoratorClasses)}>
                        {t(text)}
                    </Typography>
                )
            })}
        </>
    )
}

const BulletedList = ({nodes, components}: RendererPropTypes) => (
    <ul>
        {nodes!.map(node => renderNode({...node, components}))}
    </ul>
)

const NumberedList = ({nodes, components}: RendererPropTypes) => (
    <ol>
        {nodes!.map(node => renderNode({...node, components}))}
    </ol>
)

const ListItem = ({nodes, components}: RendererPropTypes) => {
    return (
        <li>
            {nodes!.map(node => renderNode({...node, components}))}
        </li>
    )
}

const ListItemChild = ({nodes, components}: RendererPropTypes) => {
    return (
        <>
            {nodes!.map(node => renderNode({...node, components}))}
        </>
    )
}

const renderNode = (node: RendererPropTypes) => {
    const Renderer = objectRenderers[node.object](node.type)
    if(!Renderer) log(`Couldn't find renderer for object ${node.object} and type ${node.type}`)
    return <Renderer key={v4()} {...node} />
}

const objectRenderers = {
    "text": () => Text,
    "inline": (type: string) => inlineRenderers[type],
    "block": (type: string) => renderers[type]
}

const inlineRenderers = {
    "link": Link
}

const renderers = {
    "heading-one": HeadingOne,
    "heading-two": HeadingTwo,
    "paragraph": Paragraph,
    "image": Image,
    "link": Link,
    "text": Text,
    "block-quote": Paragraph,
    "bulleted-list": BulletedList,
    "list-item": ListItem,
    "list-item-child": ListItemChild,
    "numbered-list": NumberedList
}

export const RichText = ({raw: {document: {nodes}}, linkComponent = RouterLink, externalLinkComponent = A}: PropTypes) => {
    const components = {
        link: linkComponent,
        externalLink: externalLinkComponent
    }
    return (
        <div>
            {nodes.map(node => {
                const Renderer = objectRenderers[node.object](node.type)
                if(!Renderer) log(`Couldn't find renderer for object ${node.object} and type ${node.type}`)
                return <Renderer key={v4()} {...node} components={components} />
            })}
        </div>
    )
}

export default RichText
