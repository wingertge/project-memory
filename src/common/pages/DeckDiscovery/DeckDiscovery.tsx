import {Button, MenuItem, TextField, Theme} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import {useEffect, useState} from "react"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import {
    Deck,
    DeckSortBy, SortDirection,
    useGlobalDecksQuery,
    useShallowDecksQuery,
    useUserLanguagesQuery
} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/common/ApolloErrorBox"
import AutocompleteTagInput from "../../components/common/AutocompleteTagInput"
import {TimedCircularProgress} from "../../components/common/TimedCircularProgress"
import DeckDisplay from "../../components/profile/DecksOverview/DeckDisplay"
import {useFormState, useID} from "../../hooks"

const sortOptions = [
    {value: "rating", text: "Rating"},
    {value: "subscribersCount", text: "Subscribers"},
    {value: "cardCount", text: "Cards"},
    {value: "name", text: "Name"}
]

const useStyles = makeStyles((theme: Theme) => ({
    deckContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        padding: theme.spacing(0, 1)
    },
    actions: {
        display: "flex",
        flexDirection: "row"
    },
    filterContainer: {
        padding: theme.spacing(2),
        paddingTop: 0
    },
    select: {
        width: 140,
        textAlign: "left",
        marginLeft: theme.spacing(2)
    },
    filterRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end"
    }
}))

interface Form {
    sortBy: DeckSortBy
    sortDirection: SortDirection
}

export const DeckDiscovery = () => {
    const classes = useStyles()
    const {t} = useTranslation()
    const id = useID()

    const [page, setPage] = useState(0)
    const [tags, setTags] = useState<string[]>([])
    const [decks, setDecks] = useState<Deck[]>([])
    const [hasMore, setHasMore] = useState(false)
    const {sortBy, sortDirection} = useFormState<Form>({sortBy: "rating", sortDirection: "desc"})
    const {search} = useFormState<{search: string}>({search: ""})

    const userLangs = useUserLanguagesQuery({variables: {userId: id}})
    const userDecks = useShallowDecksQuery({variables: {id}})
    const ownedDecks = oc(userDecks.data).user.ownedDecks([]) as Deck[]
    const subscribedDecks = oc(userDecks.data).user.subscribedDecks([]) as Deck[]
    const nativeLanguage = oc(userLangs.data).user.nativeLanguage()
    const userLanguages = oc(userLangs.data).user.languages()
    const {data, loading, error} = useGlobalDecksQuery({
        skip: !nativeLanguage || !userLanguages || userDecks.loading,
        variables: {
            userId: id,
            filter: {
                limit: 51 + ownedDecks.length + subscribedDecks.length,
                nativeLanguage: oc(userLangs.data).user.nativeLanguage.id(),
                offset: page * 50,
                tags: tags.length > 0 ? tags : undefined,
                search: search.value.length > 0 ? search.value : undefined,
                sortBy: sortBy.value,
                sortDirection: sortDirection.value,
                languages: oc(userLangs.data).user.languages([]).map(lang => lang.id)
            }
        }
    })
    const queryDecks = oc(data).decks([]) as Deck[]

    useEffect(() => {
        if(!loading) {
            let newDecks = queryDecks.filter(deck => !ownedDecks.some(ownedDeck => ownedDeck.id === deck.id) && !subscribedDecks.some(subscribedDeck => subscribedDeck.id === deck.id))
            setHasMore(newDecks.length > 50)
            newDecks = newDecks.slice(0, 50)
            setDecks(newDecks)
        }
    }, [queryDecks])

    if(error || userLangs.error || userDecks.error) return <ApolloErrorBox error={error || userLangs.error || userDecks.error} />
    if(userLangs.loading || userDecks.loading) return <TimedCircularProgress />

    return (
        <div>
            <div className={classes.filterContainer}>
                <div className={classes.filterRow}>
                    <TextField fullWidth label={t("Search")} value={search.value} onChange={search.onChange} />
                    <TextField label={t("Sort By")} select value={sortBy.value} onChange={sortBy.onChange} className={classes.select} SelectProps={{style: {height: 32}}}>
                        {sortOptions.map(sortOption => (
                            <MenuItem key={sortOption.value} value={sortOption.value}>
                                {t(sortOption.text)}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div className={classes.filterRow}>
                    <AutocompleteTagInput label={t("Tags")} onAdd={tag => setTags([...tags, tag])} onDelete={tag => setTags(tags.filter(otherTag => otherTag !== tag))} chips={tags} fullWidth />
                    <TextField label={t("Sort Direction")} select value={sortDirection.value} onChange={sortDirection.onChange} className={classes.select} SelectProps={{style: {height: 32}}}>
                        <MenuItem key="desc" value="desc">
                            {t("Descending")}
                        </MenuItem>
                        <MenuItem key="asc" value="asc">
                            {t("Ascending")}
                        </MenuItem>
                    </TextField>
                </div>
            </div>
            <div className={classes.deckContainer}>
                {decks.map(deck => (
                    <DeckDisplay key={deck.id} owned={false} subscribed={false} deck={deck} />
                ))}
            </div>
            <div className={classes.actions}>
                {page > 0 && <Button onClick={() => setPage(p => p - 1)}>{t("Back")}</Button>}
                <div style={{flex: "1 1 100%"}} />
                {hasMore && <Button onClick={() => {
                    setHasMore(false)
                    setPage(p => p + 1)
                }}>{t("Next")}</Button>}
            </div>
        </div>
    )
}

export default DeckDiscovery
