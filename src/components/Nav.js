import React from "react";
import "../style/Nav.css";
import { withAuth0 } from "@auth0/auth0-react";
import { Link, NavLink } from "react-router-dom";

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
                <li>
                    <NavLink activeClassName="active" className="sidelink" to={ page.link }>
                        { page.title }
                    </NavLink>
                </li> 
            )
        }
    );
    }

    handleSearch() {
        
    }

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
                            <form action="/results" method="get">
                                <input placeholder="Search" type="search" id="search" />
                                <button className="fas fa-search fa-1x" type="submit" id="searchButton" onSubmit={ this.handleSearch } />
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

export default withAuth0(Nav);