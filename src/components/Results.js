import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../setup";
import { getChunkOfBooks } from "../fauna";
import {
    Typography, 
    ListItem,
    List,
    makeStyles,
    ListItemText
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    header: {
        fontSize: '37px'
    },
    links: {
        color: '#111111',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
}));

const Results = (props) => {
    const [searchResults, setSearchResults] = React.useState([]);
    const context = React.useContext(AppContext);
    const classes = useStyles();

    React.useEffect(() => {
        setSearchResults(context.searchResults);
    }, [setSearchResults, context.searchResults]);
    
    return (
        <>
            <Typography variant="h2" className={classes.header}>Search Results: { context.realSearchInput }</Typography>
            <List id="results">
                {searchResults ? searchResults.map((book) => {
                    var ln = book.data;
                    
                    return (
                        <ListItem key={ln.isbn} className={classes.links} name={ ln.title } component={Link} to={ "/book/" + ln.isbn }>
                            <ListItemText>{ln.title + " by " + ln.author}</ListItemText>
                        </ListItem>
                    )
                }) : <p>Sorry, we couldn't find that book. <Link to="/add-book">Try Adding it to BookWyrm</Link></p> }
            </List>
        </>
    );
}

export default Results;