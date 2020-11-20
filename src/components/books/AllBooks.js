import React from "react";
import { useQuery } from "react-query";
import { getAllBooks } from "../../fauna";
import {
    ListItem,
    List,
    CircularProgress,
    makeStyles,
    Backdrop
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { BookCard } from "./Book";

const queryAllBooks = async (key) => await getAllBooks();

const useStyles = makeStyles((theme) => ({
    spinner: {
        textAlign: 'center',
        color: 'whitesmoke'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer - 1,
        color: '#fff'
    }
}))

const AllBooks = () => {
    const classes = useStyles();
    const { data, isLoading, isError, error } = useQuery(['all-books'], queryAllBooks);
    const books = data;

    const Content = () => {
        if (isLoading) {
            return (
                <Backdrop open={true} className={classes.backdrop}>
                    <CircularProgress color="primary" className={classes.spinner} />
                </Backdrop>
            );
        } else if (isError) {
            return <Alert severity="error">Sorry, something went wrong. {error.message}</Alert>
        } else {
            return (
                <List id="results">
                    {books ? books.map((book) => {
                        var ln = book;
                        
                        return (
                            <ListItem key={ln.isbn13 || ln.isbn || ln.isbn10} name={ ln.title }>
                                <BookCard {...ln} href={`/book/${ln.isbn13 || ln.isbn10 || ln.isbn}`} />
                            </ListItem>
                        )
                    }) : <p>Sorry, No books found.</p> }
                </List>
            )
        }
    }
    
    return <Content />
}

export default AllBooks;