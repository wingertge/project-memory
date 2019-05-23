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

import {Tab, Tabs, TextField} from "@material-ui/core"
import {
    FormatBold,
    FormatItalic,
    FormatListBulleted,
    FormatListNumbered,
    FormatListNumberedRtl, FormatQuote,
    FormatSize, Functions, InsertLink
} from "@material-ui/icons"
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab"
import {makeStyles, useTheme} from "@material-ui/styles"
import {useEffect, useRef, useState} from "react"
import React, {KeyboardEvent} from "react"
import {useTranslation} from "react-i18next"
import ReactMarkdown from "react-markdown"
import {usePrevious} from "../../hooks"
import {Theme} from "../../theme"
import breaks from "remark-breaks"

interface PropTypes {
    variant?: "outlined" | "filled" | "standard"
    rows?: number
    rowsMax?: number
    value: string
    onChange: (s: string | ((val: string) => string)) => void
    label?: string
    className?: string
    error?: boolean
    helperText?: string
    autoFocus?: boolean
}

const useStyles = makeStyles((theme: Theme) => ({
    headerBar: {
        display: "flex",
        flexDirection: "row",
        position: "relative"
    },
    toolbar: {
        position: "absolute",
        right: 0,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: theme.spacing(1, 0, 1, 1),
        "& > *": {
            marginLeft: theme.spacing(1)
        },
        [theme.breakpoints.down("md")]: {
            display: "none"
        }
    },
    content: {
        minHeight: 237,
        maxHeight: 437,
        overflow: "auto",
        textAlign: "left",
        "& > p": {
            display: "block",
            width: "100%",
            wordWrap: "break-word" as any,
            maxHeight: 1.43 * 14 * 15,
            overflow: "auto"
        }
    },
    editor: {
        padding: theme.spacing(2, 0, 1, 0)
    }
}))

export const RichTextEditor = ({variant = "outlined", rows = 10, rowsMax = 20, value, onChange, label, className, error, helperText, autoFocus}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const theme = useTheme<Theme>()

    const input = useRef<HTMLInputElement>()
    const [tab, setTab] = useState(0)
    const [textDecorations, setTextDecorations] = useState<string[]>([])
    const [textContainer, setTextContainer] = useState<string | undefined>(undefined)
    const [listStyle, setListStyle] = useState<string | undefined>(undefined)
    const [numberedListIndex, setNumberedListIndex] = useState(1)

    const prev = usePrevious({textDecorations, textContainer, listStyle})

    useEffect(() => {
        if(!prev) return

        const isBold = textDecorations.includes("bold")
        const wasBold = prev.textDecorations.includes("bold")
        const isItalic = textDecorations.includes("italic")
        const wasItalic = prev.textDecorations.includes("italic")

        if(isBold !== wasBold) onChange(val => val + "**")
        if(isItalic !== wasItalic) onChange(val => val + "*")

        if(textContainer !== prev.textContainer) {
            if(textContainer === "code" || prev.textContainer === "code") onChange(val => val + "`")
            if(textContainer === "quote") onChange(val => val + "\n> ")
            if(textContainer === "link") {
                onChange(val => val + "[](url)")
                setTextContainer(undefined)
            }
        }
        if(listStyle !== prev.listStyle) {
            if(prev.listStyle === "numbered-list") setNumberedListIndex(1)
            if(listStyle === "numbered-list") {
                onChange(val => `${val}\n${numberedListIndex}. `)
                setNumberedListIndex(i => i + 1)
            }
            if(listStyle === "bulleted-list") onChange(val => val + "\n- ")
            if(listStyle === "header") onChange(val => val + "\n### ")
        }
    }, [textDecorations, textContainer, listStyle])

    const onKeyPress = (e: KeyboardEvent) => {
        if(e.key === "Enter") onEnter(e)
        if(e.ctrlKey) {
            if(e.key === "b") {
                if(textDecorations.includes("bold"))
                    setTextDecorations(val => val.filter(it => it !== "bold"))
                else setTextDecorations(val => [...val, "bold"])
            }
            if(e.key === "i") {
                if(textDecorations.includes("italic"))
                    setTextDecorations(val => val.filter(it => it !== "italic"))
                else setTextDecorations(val => [...val, "italic"])
            }
            if(e.key === "q") {
                if(textContainer === "quote") setTextContainer(undefined)
                else setTextContainer("quote")
            }
            if(e.key === "c") {
                if(textContainer === "code") setTextContainer(undefined)
                else setTextContainer("code")
            }
            if(e.key === "l") {
                if(textContainer === "link") setTextContainer(undefined)
                else setTextContainer("link")
            }
            if(e.key === "h") {
                if(listStyle === "header") setListStyle(undefined)
                else setListStyle("header")
            }
            if(e.key === "u") {
                if(listStyle === "bulleted-list") setListStyle(undefined)
                else setListStyle("bulleted-list")
            }
            if(e.key === "o") {
                if(listStyle === "numbered-list") setListStyle(undefined)
                else setListStyle("numbered-list")
            }
        }
    }

    const onEnter = (e: KeyboardEvent) => {
        if(input.current!.selectionEnd! < value.length - 1) return
        e.preventDefault()
        let newVal = value
        if(textDecorations.includes("bold")) newVal += "**"
        if(textDecorations.includes("italic")) newVal += "*"
        newVal += "\n"
        if(textContainer === "quote") newVal += "> "
        if(textContainer === "link") setTextContainer(undefined)
        if(listStyle === "header") newVal += "### "
        if(listStyle === "bulleted-list") newVal += "- "
        if(listStyle === "numbered-list") {
            newVal += `${numberedListIndex}. `
            setNumberedListIndex(i => i + 1)
        }
        if(textDecorations.includes("bold")) newVal += "**"
        if(textDecorations.includes("italic")) newVal += "*"
        onChange(newVal)
    }

    return (
        <div className={className}>
            <div className={classes.headerBar}>
                <Tabs value={tab} onChange={(_, newTab) => setTab(newTab)} indicatorColor="primary">
                    <Tab label={t("Write")} />
                    <Tab label={t("Preview")} />
                </Tabs>
                {tab === 0 && (
                    <div className={classes.toolbar}>
                        <ToggleButtonGroup value={textDecorations} onChange={(_, newVal) => setTextDecorations(newVal)}>
                            <ToggleButton title={t("Bold (Ctrl + B)")} value="bold">
                                <FormatBold />
                            </ToggleButton>
                            <ToggleButton title={t("Italic (Ctrl + I)")} value="italic">
                                <FormatItalic />
                            </ToggleButton>
                        </ToggleButtonGroup>
                        <ToggleButtonGroup exclusive value={textContainer} onChange={(_, newVal) => setTextContainer(newVal)}>
                            <ToggleButton title={t("Quote (Ctrl + Q)")} value="quote">
                                <FormatQuote />
                            </ToggleButton>
                            <ToggleButton title={t("Code (Ctrl + C)")} value="code">
                                <Functions />
                            </ToggleButton>
                            <ToggleButton title={t("Link (Ctrl + L)")} value="link">
                                <InsertLink />
                            </ToggleButton>
                        </ToggleButtonGroup>
                        <ToggleButtonGroup exclusive value={listStyle} onChange={(_, newVal) => setListStyle(newVal)}>
                            <ToggleButton title={t("Header (Ctrl + H)")} value="header">
                                <FormatSize />
                            </ToggleButton>
                            <ToggleButton title={t("Bulleted List (Ctrl + U)")} value="bulleted-list">
                                <FormatListBulleted />
                            </ToggleButton>
                            <ToggleButton title={t("Numbered List (Ctrl + O)")} value="numbered-list">
                                {theme.direction === "rtl" ? <FormatListNumberedRtl /> : <FormatListNumbered />}
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                )}
            </div>
            <div className={classes.editor}>
                <TextField
                    label={label}
                    value={value}
                    multiline
                    rows={rows} rowsMax={rowsMax}
                    variant={variant as any}
                    fullWidth
                    inputRef={input as any}
                    onKeyDown={onKeyPress}
                    onChange={e => onChange(e.target.value)}
                    error={error}
                    helperText={helperText}
                    style={{display: tab === 0 ? "inline-flex" : "none"}}
                    autoFocus={autoFocus}
                />
                {tab === 1 && (
                    <ReactMarkdown className={classes.content} plugins={[breaks]}>{value}</ReactMarkdown>
                )}
            </div>
        </div>
    )
}

export default RichTextEditor
