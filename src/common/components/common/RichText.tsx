/* tslint:disable:object-literal-key-quotes */
import {Typography} from "@material-ui/core"
import * as React from "react"
import {useTranslation} from "react-i18next"
import v4 from "uuid/v4"
import GraphImg from "graphcms-image"

interface DocumentTree {
    nodes: Node[]
}

interface Node {
    object: string,
    type: string,
    data: {} | ImageData,
    nodes?: Node[]
    leaves?: Leaf[]
}

interface Leaf {
    object: string,
    text: string,
    marks: any[]
}

interface ImageData {
    src: string,
    title: string,
    mimeType: string,
    width: number,
    height: number,
    handle: string
}

interface PropTypes {
    raw: {document: DocumentTree}
}

const HeadingOne = ({nodes}: Node) => {
    const {t} = useTranslation()

    return nodes!.some(({leaves}) => leaves!.some(({text}) => text !== "")) && nodes!.map(({leaves}) => (
        <div key={v4()}>
            {leaves!.map(({text}) => text !== "" && (
                <Typography variant="h5" key={v4()}>{t(text)}</Typography>
            ))}
        </div>
    ))
}

const HeadingTwo = ({nodes}: Node) => {
    const {t} = useTranslation()

    return nodes!.some(({leaves}) => leaves!.some(({text}) => text !== "")) && nodes!.map(({leaves}) => (
        <div key={v4()}>
            {leaves!.map(({text}) => text !== "" && (
                <Typography variant="h6" key={v4()}>{t(text)}</Typography>
            ))}
        </div>
    ))
}

const Paragraph = ({nodes}: Node) => {
    const {t} = useTranslation()

    return nodes!.some(({leaves}) => leaves!.some(({text}) => text !== "")) && nodes!.map(({leaves}) => (
        <div key={v4()}>
            {leaves!.map(({text}) => text !== "" && (
                <Typography key={v4()}>{t(text)}</Typography>
            ))}
        </div>
    ))
}

const Image = ({data, nodes}: Node) => {
    const {t} = useTranslation()
    const {width, height} = data as ImageData

    return (
        <div>
            <GraphImg image={data} alt="Image" style={{maxWidth: width, maxHeight: height, margin: "32px auto"}} />
            {nodes!.some(({leaves}) => leaves!.some(({text}) => text !== "")) && nodes!.map(({leaves}) => (
                <div key={v4()}>
                    {leaves!.map(({text}) => text !== "" && <Typography key={v4()}>{t(text)}</Typography>)}
                </div>
            ))}
        </div>
    )
}

const renderers = {
    "heading-one": HeadingOne,
    "heading-two": HeadingTwo,
    "paragraph": Paragraph,
    "image": Image
}

export const RichText = ({raw: {document: {nodes}}}: PropTypes) => {
    return (
        <div>
            {nodes.map(node => {
                const Renderer = renderers[node.type]
                return <Renderer key={v4()} {...node} />
            })}
        </div>
    )
}

export default RichText
