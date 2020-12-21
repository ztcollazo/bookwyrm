import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getBook } from "../../fauna";
import { Rating } from "@material-ui/lab";

import { 
    Card,
    CardContent,
    makeStyles,
    CardHeader,
    Typography,
    CardActionArea,
    CardActions,
    IconButton
} from "@material-ui/core";
import {
    ThumbUpRounded,
    ThumbDownRounded
} from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import BookCard from "./Book";

const useStyles = makeStyles(() => ({
    card: {
        width: '43%',
        float: 'right',
        marginLeft: '10px'
    },
    stars: {
        color: '#DDCD00'
    },
    info: {
        color: 'darkgrey',
        marginTop: 'auto'
    },
    left: {
        float: 'left'
    },
    right: {
        float: 'right'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
    },
    action: {
        height: '100%'
    },
    review: {
        marginTop: 10
    }
}))

export const ReviewCard = ({title, authors = [], rating, raters, isbn13}) => {
    const classes = useStyles();
    var author = authors.length > 1 ? authors.join(", ") : authors[0];

    return (
        <Card className={classes.card}>
            <CardActionArea component={Link} to={`/review/${isbn13}`} className={classes.action}>
                <CardHeader title="Reviews" subheader={title + ' by ' + author} action={<Rating value={rating} readOnly />} />
                <CardContent className={classes.content}>
                    {/* 3 Reviews Go Here. To do: add a <CardActionArea /> to redirect to the reviews page. */}
                    <span className={classes.info}>
                        <Typography className={classes.left} variant="subtitle2" gutterBottom>{rating + " stars"}</Typography>
                        <Typography className={classes.right} variant="subtitle2" gutterBottom>{raters + " reviews"}</Typography>
                    </span>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

const SingleReview = (props) => {
    const classes = useStyles();

    return (
        <Card className={classes.review} {...props}>
            <CardHeader title="An OK book" subheader="John Doe" action={<Rating value={3} readOnly />} />
            <CardContent>
                <Typography>Review Body</Typography>
            </CardContent>
            <CardActions>
                <IconButton><ThumbUpRounded /></IconButton>
                <IconButton><ThumbDownRounded /></IconButton>
            </CardActions>
        </Card>
    )
}

const queryBook = async (key, params) => await getBook(params);

export const ReviewPage = () => {
    const { isbn } = useParams();
    const { data = {} } = useQuery(['book', { ref: isbn }], queryBook);

    /* 
        {
            title: string,
            reviewer: string,
            body: string,
            rating: integer,
            likes: integer,
            book: integer - the isbn
        }
    */

    return (
        <>
            <BookCard {...data} />
            <div>
                {[1,2,3,4,5].map((i) => (<SingleReview key={i} />))}
            </div>
        </>
    );
}