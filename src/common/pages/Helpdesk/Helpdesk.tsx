import * as React from "react"
import useRouter from "use-react-router/use-react-router"
import HelpdeskArticle from "./HelpdeskArticle"
import HelpdeskNav from "./HelpdeskNav"

interface Params {
    slug?: string
}

export const Helpdesk = () => {
    const {match: {params: {slug = "index"}}} = useRouter<Params>()

    return (
        <div>
            <HelpdeskNav />
            <HelpdeskArticle slug={slug} />
        </div>
    )
}

export default Helpdesk
