import {Button, TextField} from "@material-ui/core"
import * as React from "react"
import Heading from "../../components/common/Heading"
import CardTable from "./CardTable"
import {Props} from "./types"

export const DeckDetailsRaw = ({t, id, openDialog, name, submitMutation, onNameChange}: Props) => (
    <div>
        <Heading>
            {t("Edit Deck")}
        </Heading>
        <form>
            <TextField label={t("Deck Name")} value={name} onChange={onNameChange} />
            <Button onClick={submitMutation}>{t("Save")}</Button>
            <Button onClick={() => openDialog({deckId: id})}>{t("Add Cards")}</Button>
        </form>
        <Heading>Cards</Heading>
        <CardTable deckId={id} />
    </div>
)
