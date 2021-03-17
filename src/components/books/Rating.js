import { List, ListItem, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import { BookCard } from "./Book";
import { getAllBooks } from "../../fauna";

const queryBooks = (key, params) => getAllBooks(params); 

const useStyles = makeStyles(() => ({
    li: {
        margin: 10
    },
    header: {
        margin: 10
    }
}));

const TopTen = () => {
    const classes = useStyles();
    const { data = [] } = useQuery(["ratings", { sortBy: 'rating' }], queryBooks);

    return (
        <List>
            {
                data.map((g, i) => {
                    return (
                        <ListItem component="span" className={classes.li} key={i + 1}>
                            <Typography gutterBotom variant="h4" className={classes.header}>{i + 1}.</Typography>
                            <BookCard {...g} pageHref={`/book/${g.isbn13 || g.isbn10 || g.isbn}`} reviewHref={`/review/${g.isbn13 || g.isbn10 || g.isbn}`} />
                        </ListItem>
                    );
                })
            }
        </List>
    )
}

export const Rating = () => {
    const classes = useStyles();

    return (
        <div>
            <Typography className={classes.header} gutterBottom variant="h4">Top Ten</Typography>
            <div>
                <TopTen />
            </div>
        </div>
    )
}

export default Rating;