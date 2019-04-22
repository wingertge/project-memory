import {Button, Divider, List, ListItem, TextField, Theme} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import React from "react"
import Heading from "../../src/common/components/common/Heading"
import PostDisplay, {Post} from "./PostDisplay"

const opPost: Post = {id: "2", createdAt: new Date(), type: "post", by: {id: "sdf", username: "Some other User", avatar: undefined}, content: "Hello, I just wanted to say Current User is really cool."}

const feed: Post[] = [
    {id: "1", createdAt: new Date(), type: "post", by: {id: "asd", username: "Current User", avatar: undefined}, content: "Hello, I just wanted to say hello again."},
    {id: "2", createdAt: new Date(), type: "repost", by: {id: "asd", username: "Current User", avatar: undefined}, content: "I wanted to add some context to this.", originalPost: opPost},
    {id: "3", createdAt: new Date(), type: "post", by: {id: "asd", username: "Current User", avatar: undefined}, content: "Hello, I just wanted to say hello."},
    {id: "4", createdAt: new Date(), type: "repost", by: {id: "asd", username: "Current User", avatar: undefined}, originalPost: opPost}
]

interface PropTypes {
    isOwn?: boolean
    userId: string
}

const useStyles = makeStyles((theme: Theme) => ({
    feed: {
        width: "100%",
        maxWidth: 800,
        paddingTop: theme.spacing(4)
    },
    newPostInput: {
        width: "100%"
    },
    postButton: {
        marginTop: theme.spacing(1)
    },
    postButtonContainer: {
        display: "flex",
        justifyContent: "flex-end"
    }
}))

export const Feed = ({isOwn}: PropTypes) => {
    const classes = useStyles()
    const t = val => val

    return (
        <div className={classes.feed}>
            <Heading>{t("Feed")}</Heading>
            {isOwn && (
                <div>
                    <TextField multiline className={classes.newPostInput} variant="outlined" rows={3} rowsMax={12} />
                    <div className={classes.postButtonContainer}>
                        <Button variant="contained" color="primary" className={classes.postButton}>{t("Post")}</Button>
                    </div>
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
