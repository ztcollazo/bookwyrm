import React from "react";
import { useParams } from "react-router-dom";
import { getBook } from "../../fauna";

export const Book = () => {
    let { isbn } = useParams();
    const book = getBook({ ref: isbn });
    let data = book;
    console.log(data);
    return (
        <div>
            <p>Title: {data.title}</p>
            <p>Author: {data.author}</p>
            <p>ISBN: {data.isbn}</p>
            <p>Description: {data.description}</p>
        </div>
    );
}

export default Book;