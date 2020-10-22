import { createContext } from "react";

export const AppContext = createContext({
    searchInput: "",
    setSearchInput: () => {}
});

export const pages = [
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
