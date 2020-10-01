import React from "react";

export const Book = ({author, title, isbn, genre, summary}) => {
    return <p>{title}, {author}</p>;
}

export default Book;