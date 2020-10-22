import React from "react";
import "../style/Nav.css";
import { Link, NavLink } from "react-router-dom";
import { AppContext } from "../setup";
import { withRouter } from "react-router-dom";

class Nav extends React.Component {
    constructor(props, pages) {
        super(props);

        this.pages = [
            {
                link: "/",
                title: "Home"
            },
            {
                link: "/browse",
                title: "Browse",
            },
            {
                link: "/top-books",
                title: "Top Books"
            },
            {
                link: "/forum",
                title: "Forum"
            },
            {
                link: "/review",
                title: "Review"
            }
        ];

        this.navLinks = this.pages.map((page) => { 
                return (
                    <li key={page.title}>
                        <NavLink activeClassName="active" className="sidelink" to={ page.link }>
                            { page.title }
                        </NavLink>
                    </li> 
                );
            }
        );
    }

    handleChange = (event) => {
        event.preventDefault();
        this.context.setSearchInput(event.currentTarget.value);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.history.push('/results');
    }

    static contextType = AppContext;
    
    render() {
        return (
            <header>         
                <nav>
                    <div id="top" >
                        <Link to="/">
                            <img src="/logo.png" alt="The BookWyrm Logo" />
                            <h1 id="title" >BookWyrm</h1>
                        </Link>
                        <div id="holder">
                            <form name="search" onSubmit={this.handleSubmit}>
                                <input name="search-input" placeholder="Search" type="search" id="search" onChange={this.handleChange} value={this.context.searchInput} />
                                <button className="fas fa-search fa-1x" type="submit" id="searchButton" />
                            </form>
                        </div>
                    </div>
                </nav>
                <div id="side" >
                    <ul>
                        { this.navLinks }
                    </ul>
                </div>
            </header>
        );
    }
}

export default withRouter(Nav);
