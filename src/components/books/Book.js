import React from "react";
import { useParams } from "react-router-dom";
import { getBook } from "../../fauna";

export const Book = (props) => {
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
            <img src={data.image} alt={data.title + " cover"} width="120" />
            <p>Title: {data.title}</p>
            <p>Author: {data.authors}</p>
            <p>ISBN: {data.isbn13}</p>
            <p>Description: {data.description}</p>
        </div>
    );
}

export default Book;