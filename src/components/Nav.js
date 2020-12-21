import React from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { AppContext } from "../setup";
import { useAuth0 } from "@auth0/auth0-react"
import { 
    AppBar, 
    Toolbar, 
    IconButton, 
    Typography, 
    InputBase, 
    Drawer,
    List,
    ListItem,
    fade, 
    makeStyles, 
    ListItemIcon,
    ListItemText,
    CssBaseline,
    Divider,
    ButtonGroup,
} from "@material-ui/core";
import {
    ChevronRightRounded,
    ArrowForwardRounded,
    SearchRounded,
    ChevronLeftRounded
} from "@material-ui/icons";
import { pages } from "../setup";
import clsx from "clsx";
import AuthButton from "./AuthButton";

export const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      width: '100%'
    },
    link: {
        textDecoration: 'none',
        marginTop: '5px'
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      height: '75px',
      backgroundColor: '#333333'
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
        top: '75px',
        width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
        top: '75px',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7) + 1,
        },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      height: '75px',
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    search: {
        position: 'fixed',
        marginRight: '30px',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
        right: '80px',
        float: 'right'
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 1),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '20ch',
        },
    },
    title: {
        flexGrow: 1,
        display: 'none',
        textDecoration: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'inline',
        },
        fontSize: '50px',
        color: '#FFFFFF'
    },
    img: {
        width: "40px",
        height: '40px'
    },
    drawerIcon: {
        //marginLeft: '-5px',
        left: '5px'
    },
    linkItemText: {
        color: '#000000',
    },
    searchButton: {
        color: 'white'
    },
    linkActive: {
        borderRight: '2px solid #333333' 
    },
    login: {
        position: "absolute",
        right: "10px",
        color: "white"
    },
    loginButton: {
        color: "whitesmoke",
        borderColor: "whitesmoke"
    }
}));

const NavLinks = (props) => {
    return pages.map((page) => { 
        return (
            <ListItem button key={page.title} component={NavLink} to={page.link} exact activeClassName={ props.classes.linkActive }>
                <ListItemIcon>
                    {page.icon}
                </ListItemIcon>
                <ListItemText className={props.classes.linkItemText} primary={page.title} />
            </ListItem> 
        );
    });
}

const DrawerIcon = ({onClick, classes, open}) => {
    return <IconButton className={classes.drawerIcon} onClick={ onClick }>
        {open ? <ChevronLeftRounded /> : <ChevronRightRounded />}
    </IconButton>;
}

const Nav = (props) => {
    const history = useHistory();
    const classes = useStyles();
    const context = React.useContext(AppContext);
    const {open, toggleDrawer} = props;
    const [searchInput, setSearchInput] = React.useState("");
    // const [authenticated, setAuthenticated] = React.useState(isAuthenticated);
    const { isAuthenticated, isLoading } = useAuth0();

    React.useEffect(() => {
        console.log(`${isAuthenticated}, ${isLoading}`);
    })

    const handleChange = (event) => {
        event.preventDefault();
        setSearchInput(event.currentTarget.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        context.setSearchInput(searchInput);
        history.push('/results');
        context.setSearchInput(searchInput);
        setSearchInput("");
    }

    return (
        <>
            <header className={classes.root}>  
                <CssBaseline />       
                <AppBar
                    position="fixed"
                    className={classes.appBar}
                >
                    <Toolbar id="top" >
                        <Link to="/" className={classes.link}>
                            <img className={classes.img} src="/logo.png" alt="The BookWyrm Logo" />
                            <Typography className={classes.title} variant="h1"> BookWyrm</Typography>
                        </Link>
                        <form onSubmit={handleSubmit} id="holder" className={classes.search} float="right" >
                            <div className={classes.searchIcon}>
                                <SearchRounded />
                            </div>
                            <InputBase 
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput
                                }} 
                                name="search-input" 
                                placeholder="Search" type="search" 
                                id="search" 
                                onChange={handleChange} 
                                value={searchInput}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                            <IconButton id="searchButton" type="submit" className={classes.searchButton}>
                                <ArrowForwardRounded />
                            </IconButton>
                        </form>
                        <ButtonGroup className={classes.login} variant="outlined">
                            <AuthButton className={classes.loginButton} />
                        </ButtonGroup>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={
                        clsx(
                            classes.drawer, {
                                [classes.drawerOpen]: open,
                                [classes.drawerClose]: !open
                            }
                        )
                    }
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open
                        })
                    }}
                >
                    <div className={classes.toolbar}>
                        <DrawerIcon open={open} classes={classes} onClick={toggleDrawer} />
                    </div>
                    <Divider />
                    <List>
                        <NavLinks classes={classes} />
                    </List>
                </Drawer>
            </header>
            <div className={classes.toolbar} />
        </>
    );
}

export default Nav;