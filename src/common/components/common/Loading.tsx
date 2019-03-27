import {CircularProgress} from "@material-ui/core"
import * as React from "react"
import {withTranslation, WithTranslation} from "react-i18next"
import {compose, pure} from "recompose"
import ErrorBox from "./ErrorBox"
import LoadingComponentProps = LoadableExport.LoadingComponentProps

type Props = WithTranslation & LoadingComponentProps

const Loading = ({error, retry, pastDelay, timedOut, t}: Props) => {
    if(error || timedOut) {
        return <ErrorBox title={t("Error!")} text={t("Error loading page. Please try again.")} retry={retry}/>
    } else if(pastDelay) {
        return <CircularProgress />
    } else {
        return null
    }
}

export default compose<Props, LoadingComponentProps>(
    pure,
    withTranslation()
)(Loading)
