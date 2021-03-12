import React, { createContext } from "react";
import  {
    HomeRounded,
    SubjectRounded,
    FormatListNumberedRounded
} from "@material-ui/icons"
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

export const AppContext = createContext({
    searchInput: "",
    setSearchInput() {},
    searchResults: "",
    setSearchResults() {},
});

export const pages = [
    {
        link: "/",
        title: "Home",
        icon: <HomeRounded />
    },
    {
        link: "/browse",
        title: "Browse",
        icon: <SubjectRounded />
    },
    {
        link: "/top-books",
        title: "Top Books",
        icon: <FormatListNumberedRounded />
    }
];

export const themeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#333333',
    },
    secondary: {
      main: '#b97600',
    },
    background: {
      default: '#f5f5f5',
    },
    error: {
      main: '#ff2222',
    },
    warning: {
      main: '#ff9900',
    },
    info: {
      main: '#2277ff',
    },
    success: {
      main: '#0a8e0e',
    },
  },
  typography: {
    h1: {
      fontSize: 50,
      fontFamily: 'Merriweather',
    },
    h2: {
      fontSize: 40,
      fontFamily: 'Merriweather',
    },
    h3: {
      fontSize: 35,
      fontFamily: 'Merriweather',
    },
    h4: {
      fontSize: 30,
      fontFamily: 'Merriweather',
    },
    h5: {
      fontSize: 25,
      fontFamily: 'Merriweather',
    },
    h6: {
      fontSize: 20,
      fontFamily: 'Merriweather',
    },
    subtitle1: {
      fontSize: 20,
    },
    subtitle2: {
      fontSize: 18,
    },
  },
};

export const theme = responsiveFontSizes(createMuiTheme(themeOptions))