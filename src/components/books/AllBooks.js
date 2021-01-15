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

const queryAllBooks = async (key) => await getAllBooks({ sortBy: 'none' });

const useStyles = makeStyles((theme) => ({
    spinner: {
        textAlign: 'center',
        color: 'whitesmoke'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer - 1,
        color: '#fff'
    }
}));

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const AllBooks = () => {
    const classes = useStyles();
    const { data = [], isLoading, isError, error } = useQuery(['all-books'], queryAllBooks);
    var books = data;
    books = shuffle(books);

    const Content = () => {
        if (isLoading) {
            return (
                <Backdrop open={true} className={classes.backdrop}>
                    <CircularProgress color="primary" className={classes.spinner} />
                </Backdrop>
            );
        } else if (isError) {
            console.log(error.message)
            return <Alert severity="error">Sorry, something went wrong.</Alert>
        } else {
            return (
                <List id="results">
                    {books ? books.map((book) => {
                        var ln = book;
                        
                        return (
                            <ListItem key={ln.isbn13 || ln.isbn || ln.isbn10} name={ ln.title }>
                                <BookCard {...ln} pageHref={`/book/${ln.isbn13 || ln.isbn10 || ln.isbn}`} reviewHref={`/write-review/${ln.isbn13 || ln.isbn10 || ln.isbn}`} />
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