import {CircularProgress} from "@material-ui/core"
import * as React from "react"
import {useTranslation} from "react-i18next"
import ErrorBox from "../apollo/ErrorBox"
import LoadingComponentProps = LoadableExport.LoadingComponentProps

export const Loading = ({error, retry, pastDelay, timedOut}: LoadingComponentProps) => {
    const {t} = useTranslation()
    if(error || timedOut) {
        return <ErrorBox title={t("Error!")} text={t("Error loading page. Please try again.")} retry={retry}/>
    } else if(pastDelay) {
        return <CircularProgress />
    } else {
        return null
    }
}

export default Loading
