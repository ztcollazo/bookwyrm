import React from "react";
import mongoose from "mongoose";

class AddBook extends React.Component {
    constructor(props) {
        super(props);

        this.title = document.getElementById("title");

        this.author = document.getElementById("author");

        this.summary = document.getElementById("summary");

        this.book = new mongoose.Schema(
            {
                bookTitle: {
                    type: String,
                    required: true
                },
                bookAuthor: {
                    type: String,
                    required: true
                },
                bookSummary: {
                    type: String,
                    required: true
                },
            }
        );

        this.NewBook = mongoose.Model(this.title.value, this.book);
    }

    setInDB() {
        var Book = new this.NewBook(
            {
                bookTitle: AddBook.title.value,
                bookAuthor: AddBook.author.value,
                bookSummary: AddBook.summary.value
            }
        );
        
        this.NewBook.create(Book);
    }

    render() {
        return (
            <>
                <h2>Add a Book to BookWyrm</h2>
                <form action="#" method="post">
                    <input id="title" type="text" placeholder="Book Title" />
                    <input id="author" type="text" placeholder="Book Author" />
                    <textarea id="summary" placeholder="Book Summary (no spoiling!)" />
                    <button type="submit" onSubmit={ this.setInDB } />
                </form>
            </>
        );
    }
};

export default AddBook;