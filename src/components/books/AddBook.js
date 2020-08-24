import React from "react";
import * as server from "../../server";

class AddBook extends React.Component {
    constructor(props) {
        super(props);

        this.title = document.getElementById("title");

        this.author = document.getElementById("author");

        this.summary = document.getElementById("summary");
    }

    setInDB() {
        var Book = new server.NewBook(
            this.title.value,
            server.book,
            {
                bookTitle: this.title.value,
                bookAuthor: this.author.value,
                bookSummary: this.summary.value
            }
        );
        
        server.NewBook.create(Book);
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