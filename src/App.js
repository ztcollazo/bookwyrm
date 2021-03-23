import React from 'react';
import Nav, { drawerWidth } from "./components/Nav";
import { AppContext } from './setup';
import { makeStyles, useMediaQuery } from "@material-ui/core";
import clsx from "clsx";

const colors = {
  primary: "#EEEEEE",
  text: "black",
  other: "darkgrey",
};

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: colors.primary,
    color: colors.text,
    height: '100%',
    marginLeft: theme.spacing(7) + 1,
    width: `calc(100% - 80px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
  },
  content: {
    padding: 20,
  }
}));

const App = (props) => {
  const {children} = props;
  const [searchInput, setSearchInput] = React.useState("");
  const [searchResults, setSearchResults] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const shouldMakeDrawerResponsive = useMediaQuery('(max-width:600px)');
  const classes = useStyles();

  return (
    <AppContext.Provider value={{ searchInput, setSearchInput, searchResults, setSearchResults, open, setOpen }}>
      <Nav shouldMakeDrawerResponsive={shouldMakeDrawerResponsive} />
      <main id="main" className={ clsx(classes.main, {
        [classes.contentShift]: open && !shouldMakeDrawerResponsive
      })}>
        <div id="content" className={classes.content}>
          {children}
        </div>
      </main>
    </AppContext.Provider>
  );

}

export default App;
