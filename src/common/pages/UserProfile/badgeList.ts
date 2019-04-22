import Admin from "../../assets/badges/admin.png"

export interface Badge {
    name: string
    title: string
    description: string
    icon: any
}

export const badgeList: {[P: string]: Badge} = {
    creator: {name: "creator", title: "Chicken Neo", description: "I made dis", icon: Admin}
}

export default badgeList
