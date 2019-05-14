import Admin from "../../assets/badges/admin.png"
import Reporter from "../../assets/badges/reporter.png"

export interface Badge {
    name: string
    title: string
    description: string
    icon: any
}

export const badgeList: {[P: string]: Badge} = {
    creator: {name: "creator", title: "Chicken Neo", description: "I made dis", icon: Admin},
    bugReporter: {name: "bugReporter", title: "Bug Huntress", description: "Thanks for making this web app not terrible", icon: Reporter}
}

export default badgeList
