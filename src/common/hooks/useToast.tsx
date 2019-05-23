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
