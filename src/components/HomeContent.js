import React from "react";
import {
    ButtonGroup,
    Button,
    makeStyles,
    Typography
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1)
        }
    },
    title: {
        textAlign: 'center',
        fontSize: '60px'
    },
    subtitle: {
        textAlign: 'center',
        fontSize: '40px'
    },
    buttons: {
        textAlign: 'center',
        color: '#333333'
    }
}));

const buttons = [
    {
        name: "Top Books",
        link: "/top-books"
    },
    {
        name: "Browse",
        link: "/browse"
    },
    {
        name: "Review a Book",
        link: "/review"
    }
];

const ButtonList = () => {
    return buttons.map((link, i) => {
        return (
            <Button component={ Link } key={link.name} id={ "button-" + i } to={ link.link }>{ link.name }</Button>
        );
    });
}

export const HomeContent = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h1" className={classes.title}>BookWyrm</Typography>
            <Typography variant="h2" className={classes.subtitle}>The Place for all books</Typography>
            <div id="buttons" className={classes.buttons}>
                <ButtonGroup className={classes.buttons} aria-label="contained primary button group">
                    <ButtonList />
                </ButtonGroup>
            </div>
        </div>
    );
}

export default HomeContent;
