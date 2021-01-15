import { Card, CardContent, CardHeader, List, ListItem, makeStyles } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import { BookCard } from "./Book";
import { getAllBooks } from "../../fauna";

const queryBooks = (key, params) => getAllBooks(params); 

const useStyles = makeStyles(() => ({
    li: {
        margin: 10
    }
}));

const TopTen = () => {
    const classes = useStyles();
    const { data = [] } = useQuery(["ratings", { sortBy: 'rating' }], queryBooks);
    var topTen = data;

    return (
        <List>
            {
                topTen.map((data, i) => {
                    return <ListItem className={classes.li} component={BookCard} {...data} pageHref={`/book/${data.isbn13 || data.isbn10 || data.isbn}`} reviewHref={`/write-review/${data.isbn13 || data.isbn10 || data.isbn}`} key={i + 1} />
                })
            }
        </List>
    )
}

export const Rating = () => {
    return (
        <Card>
            <CardHeader title="Top Books" />
            <CardContent>
                <TopTen />
            </CardContent>
        </Card>
    )
}

export default Rating;