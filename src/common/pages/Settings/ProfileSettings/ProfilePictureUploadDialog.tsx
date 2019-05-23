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

import {Button, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core"
import React, {useState} from "react"
import {useTranslation} from "react-i18next"
import {useUploadProfilePictureMutation} from "../../../../generated/graphql"
import {useID} from "../../../hooks"
import ImageUploader from "../../../components/common/ImageUploader"

const ProfilePictureUploadDialog = ({closeDialog}) => {
    const {t} = useTranslation()
    const userId = useID()
    const [file, setFile] = useState<File | undefined>(undefined)
    const [uploadPicture, {loading: saving}] = useUploadProfilePictureMutation({context: {hasUpload: true}})
    const onSave = () => {
        uploadPicture({variables: {userId, file}}).then(closeDialog)
    }

    return (
        <>
            <DialogTitle>{t("Upload a picture")}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {t("Select a profile picture to upload.")}
                </DialogContentText>
                <ImageUploader
                    onChange={newFiles => setFile(newFiles[0])}
                    buttonText={t("Choose images")}
                    label={t("Max file size: 5mb, accepted: jpg, png, gif")}
                    fileSizeError={t("File is too large")}
                    fileTypeError={t("This file extension is unsupported")}
                    singleImage
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>
                    {t("Cancel")}
                </Button>
                <Button variant="contained" color="primary" disabled={!file || saving} onClick={onSave}>
                    {saving ? t("Uploading...") : t("Save")}
                </Button>
            </DialogActions>
        </>
    )
}

export default ProfilePictureUploadDialog
