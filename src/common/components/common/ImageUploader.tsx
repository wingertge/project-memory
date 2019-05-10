import {Avatar, Button, Typography} from "@material-ui/core"
import {fade} from "@material-ui/core/styles"
import {CloudUpload} from "@material-ui/icons"
import {createStyles, makeStyles} from "@material-ui/styles"
import * as React from "react"
import {useCallback, useEffect, useState} from "react"
import {useDropzone} from "react-dropzone"
import FlipMove from "react-flip-move"
import {useTranslation} from "react-i18next"
import {Theme} from "../../theme"

interface PropTypes {
    className?: string
    buttonType?: "contained" | "outlined" | "text"
    buttonColor?: "primary" | "secondary" | "default" | "inherit"
    fileContainerStyle?: object
    onChange?: (files: File[]) => void
    buttonClassName?: string
    buttonStyles?: object
    withPreview?: boolean
    accept?: string
    name?: string
    withIcon?: boolean
    buttonText?: string
    withLabel?: boolean
    label?: string
    labelStyles?: object
    labelClass?: string
    imgExtension?: string[]
    maxFileSize?: number
    fileSizeError?: string
    fileTypeError?: string
    errorClass?: string
    errorStyle?: object
    singleImage?: boolean
    style?: object
    defaultImage?: string
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    preview: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        width: "100%",
        maxWidth: 300,
        height: "100%",
        maxHeight: 300
    },
    previewImage: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%"
    },
    input: {
        opacity: 0,
        position: "absolute",
        zIndex: -1
    },
    root: {
        width: 400,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        [theme.breakpoints.down(432)]: {
            width: "100%"
        }
    },
    dropZone: {
        width: "100%",
        height: 300,
        display: "flex",
        flexDirection: "column" as "column",
        alignItems: "center",
        justifyContent: "center",
        borderStyle: "dashed",
        borderWidth: 2,
        borderColor: fade(theme.palette.text.primary, 0.4),
        borderRadius: 8
    },
    button: {
        margin: theme.spacing(2)
    },
    fileContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%"
    },
    clearButton: {
        padding: 1,
        position: "absolute",
        top: 4,
        right: 4
    }
}))

export const ImageUploader = ({
    defaultImage,
    onChange,
    imgExtension = [".jpg", ".jpeg", ".gif", ".png"],
    maxFileSize = 5242880,
    errorStyle = {},
    fileSizeError = "File is too large",
    fileTypeError = "This file extension is unsupported",
    withIcon = true,
    style = {},
    fileContainerStyle = {},
    withLabel = true,
    labelStyles = {},
    buttonText = "Choose images",
    buttonType = "contained",
    buttonColor = "primary",
    buttonStyles = {},
    name,
    singleImage = false,
    accept = "accept=image/*",
    withPreview = true
}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const [pictures, setPictures] = useState<string[]>([])
    const [files, setFiles] = useState<File[]>([])
    const [notAcceptedFileType, setNotAcceptedFileType] = useState<string[]>([])
    const [notAcceptedFileSize, setNotAcceptedFileSize] = useState<string[]>([])
    const [inputElement, setInputElement] = useState<any>(null)

    useEffect(() => {if(onChange) onChange(files)}, [files])
    useEffect(() => {if(defaultImage) setPictures([defaultImage])}, [defaultImage])

    const hasExtension = (fileName: string) => {
        const pattern = "(" + imgExtension.join("|").replace(/\./g, "\\.") + ")$"
        return new RegExp(pattern, "i").test(fileName)
    }

    const readFile = (file: File) => {
        return new Promise(resolve => {
            const reader = new FileReader()

            reader.onload = e => {
                // @ts-ignore
                const dataURL = e.target!.result.replace(";base64", `;name=${file.name};base64`)
                resolve({file, dataURL})
            }

            reader.readAsDataURL(file)
        })
    }

    const onDropFiles = (newFiles: File[]) => {
        const newFilePromises: Array<Promise<any>> = []

        newFiles.forEach(file => {
            if (!hasExtension(file.name)) setNotAcceptedFileType(current => [...current, file.name])
            if(file.size > maxFileSize) setNotAcceptedFileSize(current => [...current, file.name])
            newFilePromises.push(readFile(file))
        })

        Promise.all(newFilePromises).then(newFilesData => {
            setPictures(current => singleImage ? [newFilesData[0].dataURL] : [...current, ...newFilesData.map(fileData => fileData.dataURL)])
            setFiles(current => singleImage ? [newFilesData[0].file] : [...current, ...newFilesData.map(fileData => fileData.file)])
        })
    }
    const onDrop = useCallback(onDropFiles, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const onUploadClick = e => {e.target.value = null}

/*    const removeImage = (picture: string) => {
        const removeIndex = pictures.findIndex(pic => pic === picture)
        setPictures(current => current.filter((e, index) => index !== removeIndex))
        setFiles(current => current.filter((e, index) => index !== removeIndex))
    }*/

    const triggerFileUpload = () => {inputElement!.click()}

    const Errors = () => (
        <>
            {notAcceptedFileType.length > 0 && (
                notAcceptedFileType.map((error, index) => (
                    <div key={`fileType${index}`} style={errorStyle}>
                        * {error} {t(fileTypeError)}
                    </div>
                ))
            )}
            {notAcceptedFileSize.length > 0 && (
                notAcceptedFileSize.map((error, index) => (
                    <div key={`fileSize${index}`} style={errorStyle}>
                        * {error} {t(fileSizeError)}
                    </div>
                ))
            )}
        </>
    )

    const Preview = () => (
        <div className={classes.preview}>
            <FlipMove enterAnimation="fade" leaveAnimation="fade" className={classes.preview}>
                {pictures.map((picture, index) => (
                    <div key={index} className={classes.preview}>
{/*                        <IconButton onClick={() => removeImage(picture)} className={classes.clearButton}>
                            <Close style={{width: 36, height: 36}} />
                        </IconButton>*/}
                        <Avatar src={picture} alt={t("Preview")} className={classes.previewImage} />
                    </div>
                ))}
            </FlipMove>
        </div>
    )

    return (
        <div style={style} className={classes.root}>
            <div style={fileContainerStyle} {...getRootProps()} className={classes.fileContainer}>
                <div {...getRootProps()} className={classes.dropZone}>
                    {withIcon && pictures.length === 0 && <CloudUpload/>}
                    {withLabel && pictures.length === 0 && (
                        <Typography style={labelStyles}>
                            {isDragActive ? t("Drop the file here...") : t("Drag 'n' drop a file here, or click to select files")}
                        </Typography>
                    )}
                    {withPreview && pictures.length > 0 && <Preview />}
                    <input type="file" ref={input => setInputElement(input)} name={t(name!)} multiple={singleImage} {...getInputProps()}
                           onChange={e => {e.persist(); onDropFiles(Array.from(e.target.files!))}} onClick={onUploadClick} accept={accept} />
                </div>
                <div>
                    <Errors />
                </div>
                <Button variant={buttonType} color={buttonColor} style={buttonStyles} onClick={triggerFileUpload} className={classes.button}>
                    {t(buttonText)}
                </Button>
            </div>
        </div>
    )
}

export default ImageUploader
