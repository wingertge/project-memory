import {useState} from "react"
import * as React from "react"
import {useTranslation} from "react-i18next"
import Toast from "../components/common/Toast"

export const useToast = (message: string, undo?: () => void) => {
    const [toastOpen, setToastOpen] = useState(false)
    const openToast = () => setToastOpen(true)
    const closeToast = () => setToastOpen(false)
    const {t} = useTranslation()
    const toast = () => <Toast message={t(message)} open={toastOpen} onClose={closeToast} onUndo={undo} />
    return {
        Toast: toast,
        openToast,
        closeToast
    }
}
