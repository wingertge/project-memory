import {Typography} from "@material-ui/core"
import React from "react"
import {MyCard, MyCardContent, MyCardHeader} from "../components/common/MyCard"

const TestBed = () => (
    <MyCard>
        <MyCardHeader>
            <Typography variant="h5">Card Heading</Typography>
        </MyCardHeader>
        <MyCardContent>
            Card Content
        </MyCardContent>
    </MyCard>
)

export default TestBed
