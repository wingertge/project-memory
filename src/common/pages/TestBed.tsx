import React from "react"
import {useID} from "../hooks"
import DeckList from "./UserProfile/DeckList"

const TestBed = () => {
    const id = useID()

    return <DeckList userId={id} isOwn={true} />
}

export default TestBed
