import {Button, CircularProgress, Divider, Grow, List, ListItem, TextField, Theme, Typography} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {oc} from "ts-optchain"
import {FeedDocument, Post, useAddPostMutation, useFeedQuery} from "../../../generated/graphql"
import ApolloErrorBox from "../../components/common/ApolloErrorBox"
import Heading from "../../components/common/Heading"
import {useUser, useValidatedFormState} from "../../hooks"
import {notEmpty, shorterThan} from "../../util/validationUtils"
import PostDisplay from "./PostDisplay"

interface PropTypes {
    isOwn?: boolean
    userId: string
}

interface Form {
    newPostContent: string
}

const useStyles = makeStyles((theme: Theme) => ({
    feed: {
        width: "100%",
        maxWidth: 800,
        padding: theme.spacing(2)
    },
    newPostInput: {
        width: "100%"
    },
    postButton: {
        marginLeft: theme.spacing(1)
    },
    postButtonContainer: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingTop: theme.spacing(1)
    }
}))

export const Feed = ({isOwn, userId}: PropTypes) => {
    const classes = useStyles()
    const {t} = useTranslation()
    const user = useUser()
    const {data, loading, error} = useFeedQuery({
        variables: {
            userId,
            filter: {
                limit: 20
            }
        }
    })
    const feed = oc(data).user.feed([]) as Post[]

    const {newPostContent, valid} = useValidatedFormState<Form>({newPostContent: ""}, {newPostContent: [{fun: shorterThan(4001), message: "Posts can't be longer than 4000 characters"}]})

    const addPostMutate = useAddPostMutation({
        variables: {
            input: {
                type: "post",
                content: newPostContent.value.trim()
            },
            filter: {
                limit: 20
            }
        },
        optimisticResponse: {
            __typename: "Mutation",
            createPost: [{id: "asd", type: "post", by: user, createdAt: new Date().toISOString(), content: newPostContent.value, __typename: "Post", originalPost: null}, ...feed.slice(0, 19)]
        },
        refetchQueries: [
            {query: FeedDocument, variables: {userId, filter: {limit: 20}}}
        ]
    })

    const addPost = () => {
        addPostMutate()
        newPostContent.set("")
    }

    const keyHandler = event => {
        if(event.key === "Enter" && event.shiftKey) {
            event.preventDefault()
            if(notEmpty(newPostContent.value.trim()) && valid) addPost()
        }
    }

    if(error) return <ApolloErrorBox error={error} />
    if(loading) return <CircularProgress />

    return (
        <div className={classes.feed}>
            <Heading>{t("Feed")}</Heading>
            {isOwn && (
                <div>
                    <TextField multiline className={classes.newPostInput} variant="outlined" rows={3} rowsMax={12} onKeyPress={keyHandler}
                               value={newPostContent.value} onChange={newPostContent.onChange} error={!!newPostContent.error} helperText={newPostContent.error} />
                    <Grow in={notEmpty(newPostContent.value.trim())} mountOnEnter unmountOnExit>
                        <div className={classes.postButtonContainer}>
                            <Typography color={shorterThan(4001)(newPostContent.value) ? "textSecondary" : "error"}>{newPostContent.value.trim().length}/4000</Typography>
                            <Button variant="contained" color="primary" className={classes.postButton} disabled={!notEmpty(newPostContent.value.trim()) || !valid} onClick={() => addPost()}>{t("Post")}</Button>
                        </div>
                    </Grow>
                </div>
            )}
            <List>
                {feed.map((post, i) => (
                    <ListItem key={post.id} disableGutters>
                        <div style={{width: "100%"}}>
                            <PostDisplay post={post} isOwn={isOwn} />
                            {i < feed.length - 1 && <Divider />}
                        </div>
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default Feed