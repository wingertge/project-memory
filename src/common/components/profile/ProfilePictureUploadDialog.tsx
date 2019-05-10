import {Button, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core"
import React, {useState} from "react"
import {useTranslation} from "react-i18next"
import {useUploadProfilePictureMutation} from "../../../generated/graphql"
import {useID} from "../../hooks"
import ImageUploader from "../common/ImageUploader"

const ProfilePictureUploadDialog = ({closeDialog}) => {
    const {t} = useTranslation()
    const userId = useID()
    const [file, setFile] = useState<File | undefined>(undefined)
    const [saving, setSaving] = useState(false)
    const uploadPicture = useUploadProfilePictureMutation({context: {hasUpload: true}})
    const onSave = () => {
        setSaving(true)
        uploadPicture({variables: {userId, file}}).then(() => {
            setSaving(false)
            closeDialog()
        })
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
