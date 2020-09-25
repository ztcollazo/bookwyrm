import React from "react";
import { addBook } from "../../fauna";

class AddBook extends React.Component {
    constructor(props) {
        super(props);

        this.title = React.createRef();

        this.author = React.createRef();

        this.isbn = React.createRef();
        
        this.summary = React.createRef();

        this.genre = React.createRef();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        addBook(JSON.stringify({
            isbn: this.isbn.current.value,
            title: this.title.current.value,
            author: this.author.current.value,
            summary: this.summary.current.value,
            genre: this.genre.current.value
        }));
    }

    render() {
        return (
            <>
                <h2>Add a Book to BookWyrm</h2>
                <form action="#" method="post" onSubmit={this.handleSubmit}>
                    <input ref={this.isbn} id="isbn" type="text" placeholder="Book ISBN" />
                    <input ref={this.title} id="title-input" type="text" placeholder="Book Title" />
                    <input ref={this.author} id="author" type="text" placeholder="Book Author" />
                    <input ref={this.genre} id="genre" placeholder="Book Genre" />
                    <textarea ref={this.summary} id="summary" placeholder="Book Summary (no spoiling!)" />
                    <button type="submit">Add Book</button>
                </form>
                <div id="message"><strong style={{ color: "red" }}>{this.text}</strong></div>
            </>
        );
    }
};

export default AddBook;