import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../setup";
import {
    Typography, 
    ListItem,
    List,
    makeStyles
} from "@material-ui/core";
import { useQuery } from "react-query";
import { getChunkOfBooks } from "../fauna";
import BookCard from "./books/Book";

const useStyles = makeStyles((theme) => ({
    header: {
        fontSize: '37px'
    },
}));

const Results = (props) => {
    const context = React.useContext(AppContext);
    const classes = useStyles();
    const { data } = useQuery(context.searchInput, getChunkOfBooks);
    const searchResults = data;
    
    return (
        <>
            <Typography variant="h2" className={classes.header}>Search Results: { context.searchInput }</Typography>
            <List id="results">
                {searchResults && searchResults.map((book) => {
                    var ln = book.data;
                    
                    return (
                        <ListItem key={ln.isbn13}>
                            <BookCard {...ln} href={`/book/${ln.isbn13 || ln.isbn10 || ln.isbn}`} />
                        </ListItem>
                    )
                })}
            </List>
            <Typography>Can't find what you're looking for? <Link to="/add-book">Try Adding it to BookWyrm.</Link></Typography>
        </>
    );
}

export default Results;