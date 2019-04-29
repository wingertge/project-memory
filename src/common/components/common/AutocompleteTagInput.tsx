/* tslint:disable:no-empty */
import {MenuItem, Paper, Theme} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import ChipInput, {Props as ChipInputProps} from "material-ui-chip-input"
import {useEffect, useState} from "react"
import * as React from "react"
import Autosuggest from "react-autosuggest"
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

const renderInput = ({value, chips, onChange, ...other}: ChipInputProps & {chips: string[]}) => <ChipInput clearInputValueOnChange onUpdateInput={onChange} value={chips} {...other} />
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
                onDelete
            }}
            focusInputOnSuggestionClick={false}
        />
    )
}

export default AutocompleteTagInput
