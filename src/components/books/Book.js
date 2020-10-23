import React from "react";
import { useParams } from "react-router-dom";
import { getBook } from "../../fauna";

export const Book = ({props}) => {
    let { isbn } = useParams();
    let data;
    if (isbn) {
        const book = getBook({ ref: isbn });
        data = book;
    } else {
        data = props.book;
    }
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