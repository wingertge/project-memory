import {Button, TextField} from "@material-ui/core"
import * as React from "react"
import Heading from "../../components/common/Heading"
import CardTable from "./CardTable"
import {Props} from "./types"

export const DeckDetailsRaw = ({t, classes, id, openDialog, name, submitMutation, onNameChange, rowsPerPage, updateRowsPerPage, page, sortBy, sortDirection}: Props) => (
    <div>
        <Heading>
            {t("Edit Deck")}
        </Heading>
        <form className={classes.form}>
            <TextField label={t("Deck Name")} value={name} onChange={onNameChange} className={classes.textField} />
            <Button onClick={submitMutation}>{t("Save")}</Button>
            <Button onClick={() => openDialog({deckId: id, rowsPerPage, page, sortBy, sortDirection})}>{t("Add Cards")}</Button>
        </form>
        <CardTable deckId={id} rowsPerPage={rowsPerPage} updateRowsPerPage={updateRowsPerPage} />
    </div>
)
