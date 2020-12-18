import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getBook } from "../../fauna";

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
    StarRounded,
    StarBorderRounded,
    StarHalfRounded,
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

function Stars ({rating}) {
    const classes = useStyles();
    var starNum = Math.floor(rating);
    var starDecimal = rating - starNum;
    const hasHalfStar = starDecimal >= 0.25 && starDecimal <= 0.75;
    const starHalves = hasHalfStar ? 1 : 0;
    if (starDecimal > 0.75) {
        starNum += 1;
    }
    const numberEmptyStars = 5 - starNum - starHalves;
    const emptyStars = numberEmptyStars > 0 ? new Array(numberEmptyStars).fill(0) : [];
    const fullStars = starNum > 0 ? new Array(starNum).fill(0) : [];

    return starNum ? (
        <span className={classes.stars}>
            {fullStars.map((_, i) => <StarRounded key={`FullStar-${i}`} />)} 
            {starHalves !== 0 ? <StarHalfRounded /> : null}
            {emptyStars.map((_, i) => <StarBorderRounded key={`NoStar-${i}`} />)}
        </span>
    ) : null;
}

export const ReviewCard = ({title, authors = [], rating, raters, isbn13}) => {
    const classes = useStyles();
    var author = authors.length > 1 ? authors.join(", ") : authors[0];

    return (
        <Card className={classes.card}>
            <CardActionArea component={Link} to={`/review/${isbn13}`} className={classes.action}>
                <CardHeader title="Reviews" subheader={title + ' by ' + author} action={<Stars rating={rating} />} />
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
            <CardHeader title="An OK book" subheader="John Doe" action={<Stars rating={3} />} />
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