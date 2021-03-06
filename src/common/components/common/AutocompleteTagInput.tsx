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

/* tslint:disable:no-empty */
import {MenuItem, Paper, Theme} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import ChipInput, {Props as ChipInputProps} from "material-ui-chip-input"
import {useEffect, useState} from "react"
import * as React from "react"
import Autosuggest from "react-autosuggest"
import {useTranslation, UseTranslationResponse} from "react-i18next"
import {oc} from "ts-optchain"
import {useGlobalTagsQuery} from "../../../generated/graphql"
import match from "autosuggest-highlight/match"
import parse from "autosuggest-highlight/parse"

interface PropTypes {
    onAdd: (chip: string) => void
    onDelete: (chip: string) => void
    chips: string[]
}

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        flexGrow: 1,
        position: "relative",
        width: "100%"
    },
    suggestionsContainerOpen: {
        position: "absolute",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(3),
        left: 0,
        right: 0,
        zIndex: 1
    },
    suggestion: {
        display: "block"
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: "none"
    }
}))

const renderInput = ({value, chips, onChange, t, ...other}: ChipInputProps & UseTranslationResponse & {chips: string[]}) =>
    <ChipInput clearInputValueOnChange blurBehavior="add" onUpdateInput={onChange} value={chips} helperText={t("Press Enter to add a tag")} {...other} />
const renderSuggestion = (suggestion, {query, isHighlighted}) => {
    const matches = match(suggestion, query)
    const parts = parse(suggestion, matches)

    return (
        <MenuItem selected={isHighlighted} component="div" onMouseDown={e => e.preventDefault()}>
            <div>
                {parts.map((part, index) => part.highlight ? (
                    <span key={index.toString()} style={{fontWeight: 500}}>
                        {part.text}
                    </span>
                ) : (
                    <span key={index.toString()}>
                        {part.text}
                    </span>
                ))}
            </div>
        </MenuItem>
    )
}

const renderSuggestionsContainer = ({containerProps, children}) => (
    <Paper {...containerProps} square>
        {children}
    </Paper>
)

export const AutocompleteTagInput = ({onAdd, onDelete, chips, ...rest}: PropTypes & Partial<ChipInputProps>) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const [textFieldInput, setTextFieldInput] = useState<string>("")
    const [suggestions, setSuggestions] = useState<string[]>([])

    const onTextFieldInputChange = (_, {newValue}) => setTextFieldInput(newValue)
    const {data, loading} = useGlobalTagsQuery({skip: textFieldInput.trim().length === 0, variables: {search: textFieldInput.trim(), limit: 8}})
    const queryResult = oc(data).tags([])

    useEffect(() => {
        if(!loading) setSuggestions(queryResult)
    }, [queryResult])

    return (
        <Autosuggest
            theme={{
                container: classes.container,
                suggestionsContainerOpen: classes.suggestionsContainerOpen,
                suggestionsList: classes.suggestionsList,
                suggestion: classes.suggestion
            }}
            renderInputComponent={renderInput as any}
            suggestions={suggestions}
            onSuggestionsFetchRequested={() => {}}
            onSuggestionsClearRequested={() => setSuggestions([])}
            renderSuggestionsContainer={renderSuggestionsContainer}
            getSuggestionValue={val => val}
            renderSuggestion={renderSuggestion}
            onSuggestionSelected={(e, {suggestionValue}) => {
                onAdd(suggestionValue)
                e.preventDefault()
            }}
            inputProps={{
                ...rest,
                chips,
                value: textFieldInput,
                onChange: onTextFieldInputChange,
                onAdd,
                onDelete,
                t
            }}
            focusInputOnSuggestionClick={false}
        />
    )
}

export default AutocompleteTagInput
