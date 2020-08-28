import React from "react";
import "../style/Nav.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, NavLink } from "react-router-dom";

const Nav = () =>  {
    //this.searchInput = document.querySelector("form#search");

    //this.searchResults = [];

    const pages = [
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

    const navLinks = pages.map((page) => {
            return (
                <li>
                    <NavLink activeClassName="active" className="sideLink" to={page.link}>{ page.title }</NavLink>
                </li>
            );
        }
    );

    function handleSearch() {

    }

    const { loginWithRedirect } = useAuth0;
        
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
                            <button className="fas fa-search fa-1x" type="submit" id="searchButton" onSubmit={handleSearch} />
                        </form>
                        <button id="login" onclick={ () => loginWithRedirect } >Login</button>
                    </div>
                </div>
            </nav>
            <div id="side" >
                <ul>
                    {navLinks}
                </ul>
            </div>
        </header>   
    );
}

export default Nav;