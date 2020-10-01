import React from "react";
import { addBook } from "../../fauna";
const isbn = require("node-isbn");

class AddBook extends React.Component {
    constructor(props) {
        super(props);

        this.isbn = React.createRef();

        this.book = this.get(this.isbn.current.value);

        this.getIsbn = isbn.provider([isbn.PROVIDER_NAMES.GOOGLE]);
    }

    get(isbnNum) {
        this.getIsbn.resolve(isbnNum)
        .then(
            (data) => {
                return {
                    title: data.title,
                    authors: data.authors,
                    publisher: data.publisher,
                    publishedDate: data.publishedDate,
                    description: data.description,
                    pageCount: data.pageCount,
                    image: data.imageLinks.thumbnail,
                    language: data.language,
                    preview: data.previewLink,
                    isbn: isbnNum
                };
            }
        )
        .catch(
            (err) => {
                console.error(err);
            }
        )
    }

    handleSubmit = (event) => {
        event.preventDefault();
        addBook(JSON.stringify(
            this.book
        ));
    }

    render() {
        return (
            <>
                <h2>Add a Book to BookWyrm</h2>
                <form action="#" method="post" onSubmit={this.handleSubmit}>
                    <input ref={this.isbn} id="isbn" type="text" placeholder="Book ISBN" />
                    <button type="button" onclick={this.get(this.isbn.current.value)} >Get Book</button>
                    <div id="book-data">
                        {}
                    </div>
                    <button type="submit">Add Book</button>
                </form>
                <div id="message"><strong style={{ color: "red" }}>{this.text}</strong></div>
            </>
        );
    }
};

export default AddBook;