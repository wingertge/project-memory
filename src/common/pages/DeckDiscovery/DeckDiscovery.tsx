import {Button, MenuItem, TextField, Theme} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import {useEffect, useState} from "react"
import * as React from "react"
import Helmet from "react-helmet"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import {
    Deck, DeckSortOptions,
    SortDirection,
    useGlobalDecksQuery,
    useUserLanguagesQuery
} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/apollo/ApolloErrorBox"
import AutocompleteTagInput from "../../components/common/AutocompleteTagInput"
import {TimedCircularProgress} from "../../components/apollo/TimedCircularProgress"
import DeckDisplay from "../Settings/DecksOverview/DeckDisplay"
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
        paddingBottom: theme.spacing(4)
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
    sortBy: DeckSortOptions
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
    const nativeLanguage = oc(userLangs.data).user.nativeLanguage()
    const userLanguages = oc(userLangs.data).user.languages()
    const {data, loading, error} = useGlobalDecksQuery({
        skip: !nativeLanguage || !userLanguages,
        variables: {
            userId: id,
            limit: 51,
            offset: page * 50,
            filter: {
                nativeLanguage: {eq: oc(userLangs.data).user.nativeLanguage.id()},
                tags: tags.length > 0 ? {all: tags} : undefined,
                search: search.value.length > 0 ? search.value : undefined,
                language: {in: oc(userLangs.data).user.languages([]).map(lang => lang.id)},
                owner: {ne: id},
                subscribers: {ne: id}
            },
            sort: {
                sortBy: sortBy.value,
                sortDirection: sortDirection.value
            }
        }
    })
    const queryDecks = oc(data).decks([]) as Deck[]

    useEffect(() => {
        if(!loading) {
            setHasMore(queryDecks.length > 50)
            setDecks(queryDecks.slice(0, 50))
        }
    }, [queryDecks])

    if(error || userLangs.error) return <ApolloErrorBox error={error || userLangs.error} />
    if(userLangs.loading) return <TimedCircularProgress />

    return (
        <div>
            <Helmet>
                <title>{t("Discover new Decks - Project Memory")}</title>
            </Helmet>
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
