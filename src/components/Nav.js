import React, { useContext } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { AppContext, pages } from "../setup";
import { useAuth0 } from "@auth0/auth0-react"
import { 
    AppBar, 
    Toolbar, 
    IconButton, 
    Typography, 
    InputBase, 
    SwipeableDrawer,
    List,
    ListItem,
    fade, 
    makeStyles, 
    ListItemIcon,
    ListItemText,
    CssBaseline,
    Divider,
    ButtonGroup,
    useMediaQuery,
    TextField
} from "@material-ui/core";
import {
    ChevronRightRounded,
    ArrowForwardRounded,
    SearchRounded,
    ChevronLeftRounded,
    LockOpenRounded,
    LockRounded,
    VpnKeyRounded,
    MenuRounded
} from "@material-ui/icons";
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
        marginTop: 5
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      height: 75,
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
    '@media (max-width:600px)': {
        drawerOpen: {
            width: '100%',
            top: 75,
            // transition: theme.transitions.create('width', {
            //     easing: theme.transitions.easing.sharp,
            //     duration: theme.transitions.duration.enteringScreen,
            // }),
        },
        drawerClose: {
            top: 75,
            // transition: theme.transitions.create('width', {
            //     easing: theme.transitions.easing.sharp,
            //     duration: theme.transitions.duration.leavingScreen,
            // }),
            // overflowX: 'hidden',
            // width: 0,
            // [theme.breakpoints.up('sm')]: {
            //     width: theme.spacing(7) + 1,
            // }
        }
    },
    '@media (min-width:600px)': {
        drawerOpen: {
            top: 75,
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            top: 75,
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
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      height: 75,
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    search: {
        position: 'fixed',
        marginRight: 30,
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
        right: 80,
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
        textDecoration: 'none',
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'inline',
        },
        fontSize: 50,
        color: '#FFFFFF'
    },
    img: {
        width: 40,
        height: 40
    },
    drawerIcon: {
        left: 5,
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
        right: 10,
        color: "white"
    },
    loginButton: {
        color: "whitesmoke",
        borderColor: "whitesmoke"
    }, 
    sideLogin: {
        marginTop: 10
    }
}));

const SideLogin = ({ isAuthenticated, loginWithRedirect, logout }) => {
    const { setOpen } = useContext(AppContext);
    if (isAuthenticated) {
        return (
            <List>
                <ListItem title="Logout" button onClick={() => {setOpen(false); return logout();}}>
                    <ListItemIcon><LockRounded /></ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </ListItem>
            </List>
        )
    }
    return (
        <List>
            <ListItem title="Login" button onClick={() => loginWithRedirect()}>
                <ListItemIcon><LockOpenRounded /></ListItemIcon>
                <ListItemText>Login</ListItemText>
            </ListItem>
            <ListItem title="Sign Up" button onClick={() => loginWithRedirect({ screen_hint: 'signup' })}>
                <ListItemIcon><VpnKeyRounded /></ListItemIcon>
                <ListItemText>Sign Up</ListItemText>
            </ListItem>
        </List>
    )
}

const NavLinks = (props) => {
    const classes = useStyles();
    const { setOpen } = useContext(AppContext);

    return pages.map((page) => { 
        return (
            <ListItem title={page.title} button key={page.title} component={NavLink} to={page.link} exact activeClassName={ classes.linkActive } onClick={() => setOpen(false)}>
                <ListItemIcon>
                    {page.icon}
                </ListItemIcon>
                <ListItemText className={classes.linkItemText} primary={page.title} />
            </ListItem> 
        );
    });
}

const DrawerIcon = ({onClick, open}) => {
    const classes = useStyles();
    return (
        <IconButton className={classes.drawerIcon} onClick={ onClick }>
            {open ? <ChevronLeftRounded /> : <ChevronRightRounded />}
        </IconButton>
    );
}

const Logo = () => {
    const classes = useStyles();

    return (
        <Link to="/" className={classes.link}>
            <img className={classes.img} src="/logo.png" alt="The BookWyrm Logo" />
            <Typography className={classes.title} variant="h1"> BookWyrm</Typography>
        </Link>
    )
}

const Nav = (props) => {
    const history = useHistory();
    const classes = useStyles();
    const context = React.useContext(AppContext);
    const [searchInput, setSearchInput] = React.useState("");
    const shouldBeResponsive = useMediaQuery('(max-width:775px)');
    const { shouldMakeDrawerResponsive } = props;
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const {open, setOpen} = context;

    const handleChange = (event) => {
        event.preventDefault();
        setSearchInput(event.currentTarget.value);
    }

    const toggleDrawer = () => {
        open ? setOpen(false) : setOpen(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        context.setSearchInput(searchInput);
        history.push('/results');
        context.setSearchInput(searchInput);
        setSearchInput("");
        setOpen(false);
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
                        {!shouldMakeDrawerResponsive ? <Logo /> : <IconButton onClick={toggleDrawer}><MenuRounded style={{color: 'white', margin: 0}} /></IconButton>}
                        {!shouldBeResponsive && <form title="Search" onSubmit={handleSubmit} id="holder" className={classes.search}>
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
                        </form>}
                        <ButtonGroup className={classes.login} variant="outlined">
                            <AuthButton className={classes.loginButton} />
                        </ButtonGroup>
                    </Toolbar>
                </AppBar>
                <SwipeableDrawer
                    disableBackdropTransition={!iOS} 
                    disableDiscovery={iOS}
                    variant={!shouldMakeDrawerResponsive ? "permanent" : "temporary"}
                    open={shouldMakeDrawerResponsive && open}
                    anchor="left"
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
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                >
                    <List className={classes.toolbar}>
                        <ListItem component={DrawerIcon} open={open} onClick={toggleDrawer} />
                    </List>
                    <Divider />
                    <List>
                        <NavLinks />
                        <ListItem component="form" style={{width: '100%'}} title="Search" onSubmit={handleSubmit} id="holder">
                            <ListItemIcon margin={5} component={IconButton} onClick={toggleDrawer}>
                                <SearchRounded />
                            </ListItemIcon>
                            <ListItemText className={classes.linkItemText}>
                                <TextField 
                                    style={{width: '100%'}}
                                    name="search-input" 
                                    placeholder="Search" 
                                    type="search" 
                                    id="search" 
                                    onChange={handleChange} 
                                    value={searchInput}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </ListItemText>
                        </ListItem>
                    </List>
                    <Divider />
                    <SideLogin loginWithRedirect={loginWithRedirect} logout={logout} isAuthenticated={isAuthenticated} />
                </SwipeableDrawer>
            </header>
            <div className={classes.toolbar} />
        </>
    );
}

export default Nav;