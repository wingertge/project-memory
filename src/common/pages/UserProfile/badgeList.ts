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
