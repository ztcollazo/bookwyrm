import React from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { AppContext } from "../setup";
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
    Divider
} from "@material-ui/core";
import {
    ChevronRightRounded,
    ArrowForwardRounded,
    SearchRounded,
    ChevronLeftRounded,
    HomeRounded,
    ForumRounded,
    SubjectRounded,
    FormatListNumberedRounded,
    RateReviewRounded,
} from "@material-ui/icons";
import clsx from "clsx";

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
        right: '0px',
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
    }
  }));

const Nav = (props) => {
    const history = useHistory();
    const classes = useStyles();
    const context = React.useContext(AppContext);
    const {open, toggleDrawer} = props;

    const pages = [
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
        },
        {
            link: "/forum",
            title: "Forum",
            icon: <ForumRounded />
        },
        {
            link: "/review",
            title: "Review",
            icon: <RateReviewRounded />
        }
    ];

    const NavLinks = () => {
        return pages.map((page) => { 
            return (
                <ListItem button key={page.title} component={NavLink} to={page.link}>
                    <ListItemIcon>
                        {page.icon}
                    </ListItemIcon>
                    <ListItemText className={classes.linkItemText} primary={page.title} />
                </ListItem> 
            );
        });
    }

    const handleChange = (event) => {
        event.preventDefault();
        context.setSearchInput(event.currentTarget.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        history.push('/results');
    }

    const DrawerIcon = ({onClick}) => {
        return <IconButton className={classes.drawerIcon} onClick={ onClick }>
            {open ? <ChevronLeftRounded /> : <ChevronRightRounded />}
        </IconButton>;
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
                        <div id="holder" className={classes.search} float="right" >
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
                                value={context.searchInput}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                            <IconButton id="searchButton" onClick={handleSubmit} height='100%' className={classes.searchButton}>
                                <ArrowForwardRounded />
                            </IconButton>
                        </div>
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
                        <DrawerIcon onClick={toggleDrawer} />
                    </div>
                    <Divider />
                    <List>
                        <NavLinks />
                    </List>
                </Drawer>
            </header>
            <div className={classes.toolbar} />
        </>
    );
}

/*
The class Component, in case things go wrong

class NavBar extends React.Component {
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
*/

export default Nav;