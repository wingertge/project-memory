import {Dialog} from "@material-ui/core"
import React from "react"
import ReportDialog from "../components/common/ReportDialog"

const TestBed = () => {
    return (
        <Dialog open>
            <ReportDialog postId="" closeDialog={() => {}} />
        </Dialog>
    )
}

export default TestBed
