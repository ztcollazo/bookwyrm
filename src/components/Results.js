import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../setup";
import { getChunkOfBooks } from "../fauna";

class Results extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchResults: []
        }
    }

    componentDidMount() { 
        this.getBooks().then(books => {
            if (books) {
                this.setState({
                    searchResults: books
                });
            }
        });
    }

    getBooks = () => {
        return getChunkOfBooks(this.context.searchInput);
    }

    static contextType = AppContext;

    render() {
        return (
            <>
                <h2>Search Results: { this.context.searchInput }</h2>
                <div id="results">
                    {this.state.searchResults !== undefined || this.state.searchResults !== null ? this.state.searchResults.map((book) => {
                        var ln = book.data;
                        
                        return (
                            <li name={ ln.title } >
                                <Link to={ "/book/" + ln.isbn } >
                                    {ln.title + " by " + ln.author}
                                </Link>
                            </li>
                        )
                    }) : <p>Sorry, we couldn't find that book. <Link to="/add-book">Try Adding it to BookWyrm</Link></p> }
                </div>
            </>
        );
    }
};

export default Results;