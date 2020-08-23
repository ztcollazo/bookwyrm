import React from "react";
import Nav from "./Nav";

class Results extends React.Component {
    constructor(props) {
        super(props);
        
        this.e = new Nav();

        this.list = this.e.searchResults.map((ln) => {
            return (
                <li name={ ln.title } >
                    <a href={ document.getElementById("form").submit() } >
                        {ln.title + " by " + ln.author}
                    </a>
                </li>
            )
        });
    }

    render() {
        return (
            <>
                <h2>Search Results: { this.e.searchInput }</h2>
                <form name="book" method="get" id="form" action="#">
                    <ul>
                        { this.list }
                    </ul>
                </form>
            </>
        );
    }
};

export default Results;