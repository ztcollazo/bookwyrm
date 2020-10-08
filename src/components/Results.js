import React from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom"

class Results extends React.Component {
    constructor(props) {
        super(props);

        this.list = Nav.searchResults.map((ln) => {
            return (
                <li name={ ln.title } >
                    <Link to={ "/book/" + ln.isbn } >
                        {ln.title + " by " + ln.author}
                    </Link>
                </li>
            )
        });
    }

    render() {
        return (
            <>
                <h2>Search Results: { Nav.searchInput }</h2>
                <div id="results">
                    {this.list}
                </div>
            </>
        );
    }
};

export default Results;