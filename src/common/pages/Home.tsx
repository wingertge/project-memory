import React, {Component} from "react"
import {withStyles} from "@material-ui/core"
import Heading from "../components/common/Heading"

const styles = {}

class Home extends Component {
    static propTypes = {}

    render() {
        return (
            <div>
                <Heading>Home</Heading>
            </div>
        )
    }
}

export default withStyles(styles)(Home)
