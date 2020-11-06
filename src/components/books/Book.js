import React from "react";
import { useParams } from "react-router-dom";
import { getBook } from "../../fauna";
import { Typography } from "@material-ui/core";
import { useQuery } from "react-query";

const queryBook = async (key, params) => await getBook(params);

export const Book = (props) => {
    const { isbn } = useParams();
    const { data, isLoading, error } = useQuery(['book', { ref: isbn || props.book.isbn }], queryBook);
    console.log(isbn);
    console.log(data);
    return data ? (
        <div>
            <img src={data.image} alt={data.title + " cover"} width="120" />
            <Typography>Title: {data.title}</Typography>
            <Typography>Author: {data.authors ? data.authors.join(", ") : data.author ? data.author : "?"}</Typography>
            <Typography>ISBN-10: {data.isbn10 ? data.isbn10 : "?"}</Typography>
            <Typography>ISBN-13: {data.isbn13 ? data.isbn13 : data.isbn ? data.isbn : "?"}</Typography>
            <Typography>Description: {data.description ? data.description : data.summary ? data.summary : "?"}</Typography>
        </div>
    ) : null;
}

export default Book;