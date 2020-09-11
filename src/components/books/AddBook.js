import React from "react";

class AddBook extends React.Component {
    constructor(props) {
        super(props);

        this.title = document.getElementById("title");

        this.author = document.getElementById("author");

        this.summary = document.getElementById("summary");
    }

    render() {
        return (
            <>
                <h2>Add a Book to BookWyrm</h2>
                <form action="#" method="post">
                    <input id="title" type="text" placeholder="Book Title" />
                    <input id="author" type="text" placeholder="Book Author" />
                    <textarea id="summary" placeholder="Book Summary (no spoiling!)" />
                    <button type="submit" />
                </form>
            </>
        );
    }
};

export default AddBook;