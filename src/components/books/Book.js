import React from "react";
import { useParams } from "react-router-dom";
import { getBook } from "../../fauna";
import { Typography } from "@material-ui/core";

export const Book = (props) => {
    const { isbn } = useParams();
    console.log(isbn);
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
            <Typography>Title: {data.title}</Typography>
            <Typography>Author: {data.authors}</Typography>
            <Typography>ISBN-10: {data.isbn10}</Typography>
            <Typography>ISBN-13: {data.isbn13}</Typography>
            <Typography>Description: {data.description}</Typography>
        </div>
    );
}

export default Book;