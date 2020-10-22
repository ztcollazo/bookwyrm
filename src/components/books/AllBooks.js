import React, { useState, useEffect, useRef } from "react";
import Book from './Book';
import { getAllBooks } from "../../fauna";

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

    console.log(books);

    const allBooks = books.map((book) => {
        return <p key={ book.isbn } >{ book.title + ", " + book.author }</p>
    });
    /*const allBooks = () => {
        for (var i in books) {
            return <Book key={ i.isbn } { ...i }></Book>
        } 
    }*/
    
    return allBooks;
}

export default AllBooks;