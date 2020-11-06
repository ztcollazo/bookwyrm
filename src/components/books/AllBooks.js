import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getAllBooks } from "../../fauna";
import {
    ListItem,
    List,
    ListItemText
} from "@material-ui/core";

const queryAllBooks = async (key) => await getAllBooks();

const AllBooks = () => {
    const { data } = useQuery(['all-books'], queryAllBooks);
    const books = data;
    
    return (
        <List id="results">
            {books ? books.map((book) => {
                var ln = book;
                
                return (
                    <ListItem key={ln.isbn} name={ ln.title } component={Link} to={ "/book/" + ln.isbn }>
                        <ListItemText>{ln.title + " by " + ln.author}</ListItemText>
                    </ListItem>
                )
            }) : <p>No books found.</p> }
        </List>
    );
}

export default AllBooks;