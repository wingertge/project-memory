import {Button, Card} from "@material-ui/core"
import React, {useRef, useState} from "react"
import RichTextEditor from "../components/common/RichTextEditor"

const TestBed = () => {
    const saveRef = useRef<() => void>()
    const [text, setText] = useState("")

    return (
        <Card style={{padding: "0px 16px", margin: 16}}>
            <RichTextEditor saveRef={saveRef} value={text} onChange={setText} />
            <Button onClick={() => saveRef.current!()}>Save</Button>
        </Card>
    )
}

export default TestBed
