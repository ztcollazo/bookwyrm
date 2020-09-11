import React from "react";
import { query as q, Client } from "faunadb";
import { withAuthenticationRequired } from "@auth0/auth0-react";

class AddBook extends React.Component {
    constructor(props) {
        super(props);

        this.title = document.getElementById("title");

        this.author = document.getElementById("author");

        this.summary = document.getElementById("summary");
    }

    setInDB() {
        const books = new Client({ secret: process.env.FAUNA_KEY_BOOKS });

        books.query(
            q.Create(
                q.Ref(
                    q.Collection('main'),
                    this.title + "-by-" + this.author
                ),
                { 
                    data: { 
                        title: this.title, 
                        author: this.author, 
                        summary: this.summary 
                    } 
                }
            )
        );
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