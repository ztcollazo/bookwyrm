import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getAllBooks } from "../../fauna";
import {
    ListItem,
    List,
    ListItemText
} from "@material-ui/core";

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    console.log(books);
    const isRendered = useRef(false);

    useEffect(() => {
        const getAll = async () => {
            try {
                if (isRendered.current === false) {
                    const result = await getAllBooks();
                    setBooks(result);
                    isRendered.current = true;
                }
            } catch (error) {
                console.error(error);
            }
        }   
        getAll()
    }, [isRendered, setBooks]);
    
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