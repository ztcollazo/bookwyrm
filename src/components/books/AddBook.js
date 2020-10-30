import React from "react";
import { addBook } from "../../fauna";
import Book from "./Book";
const isbn = require("node-isbn");

class AddBook extends React.Component {
    constructor(props) {
        super(props);
        this.results = React.createRef();

        this.state = {
            isbn: "",
            book: null,
        }
    }

    get = (isbnNum) => {
        const getIsbn = isbn.provider([isbn.PROVIDER_NAMES.GOOGLE]);

        return getIsbn.resolve(isbnNum)
            .then(
                (book) => {
                    console.log(book);
                    let data = book;

                    return {
                        title: data.title,
                        subtitle: data.subtitle,
                        authors: data.authors,
                        isbn10: data.industryIdentifiers[0].identifier,
                        isbn13: data.industryIdentifiers[1].identifier,
                        publisher: data.publisher,
                        publishedDate: data.publishedDate,
                        description: data.description,
                        pageCount: data.pageCount,
                        image: data.imageLinks.thumbnail,
                        language: data.language,
                        preview: data.previewLink,
                        rating: data.averageRating,
                        raters: data.ratingsCount,
                        keywords: [
                            data.title,
                            data.authors,
                            data.description,
                            data.industryIdentifiers[0].isbn10,
                            data.industryIdentifiers[1].isbn13,
                            data.publisher,
                            data.title + " by " + data.authors
                        ]
                    };
                }
            )
            .catch(
                (err) => {
                    console.error(err);
                }
            );
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.book = this.get(this.state.isbn);
        addBook(
            JSON.stringify(this.book)
        );
    }

    handleClick = async () => { 
        this.setState({ book: await this.get(this.state.isbn) });
    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({ isbn: event.target.value });
    }

    render() {
        return (
            <>
                <h2>Add a Book to BookWyrm</h2>
                <form action="#" method="post" onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} id="isbn" type="text" placeholder="Book ISBN" />
                    <button type="submit" onClick={this.handleClick} >Get Book</button>

                    {this.state.book ? <Book book={this.state.book} /> : null}
                    {this.state.book ? <button type="button">Add Book</button> : null}
                </form>
                <div id="message"><strong style={{ color: "red" }}></strong></div>
            </>
        );
    }
};

export default AddBook;