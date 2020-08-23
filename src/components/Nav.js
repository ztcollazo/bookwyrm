import React from "react";
import AddBook from "./books/AddBook";
import "../style/Nav.css";
//import App from "../App";
import { Link, NavLink } from "react-router-dom";

class Nav extends React.Component {

    constructor(props) {
        super(props);

        this.searchInput = document.querySelector("form#search");

        this.searchResults = [];

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
                        <NavLink activeClassName="active" className="sideLink" to={page.link}>{ page.title }</NavLink>
                    </li>
                );
            }
        );
    }

    handleSearch() {

        AddBook.NewBook.find(
            {
                title: {
                    $regex: this.searchInput,
                    $options: 'i'
                }
            } || {
                author: {
                    $regex: '.*' + this.searchInput + '.*',
                    $options: 'i'
                }
            }, 
            (err, docs) => {
                docs.map( function (x) {
                    this.searchResults.push(docs[x]);
                    return 0;
                });
            }
        );
    }

    /*handleToggle() {
        var theme = App.public.theme.opposite;
        this.props.onClick(theme);
    }*/

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
                            <button className="fas fa-search fa-1x" type="submit" id="searchButton" onSubmit="this.handleSearch" />
                        </form>
                            <button onClick={this.handleToggle} id="toggle" className="fas fa-adjust fa-1x" />
                        </div>
                    </div>
                </nav>
                <div id="side" >
                    <ul>
                        {this.navLinks}
                    </ul>
                </div>
            </header>   
        );
    } 
}

export default Nav;