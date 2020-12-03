import { 
    Card,
    CardContent,
    makeStyles,
    CardHeader,
    Typography
} from "@material-ui/core";
import {
    StarRounded,
    StarBorderRounded,
    StarHalfRounded
} from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles(theme => ({
    card: {
        width: '43%',
        float: 'right',
        marginLeft: '10px'
    },
    stars: {
        color: '#EDED00'
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
        flexDirection: 'column'
    }
}))

export const ReviewCard = ({title, authors = [], rating, raters}) => {
    const classes = useStyles();
    var author = authors.length > 1 ? authors.join(", ") : authors[0];
    function Stars () {
        var starNum = Math.floor(rating);
        var starHalves = rating;
        function range(start, stop, step) {
            var a = [start], b = start;
            while (b < stop) {
                a.push(b += step || 1);
            }
            return b > stop ? a.slice(0, -1) : a;
        }
        var fullStarArray = range(1, starNum);
        function NoStars () {
            for (var i = 0; i < 5 - starNum; i++) {
                return <StarBorderRounded />
            }
        }
        while (starHalves >= 1) {
            starHalves -= 1;
        }
        return starNum ? (
            <span className={classes.stars}>
                {
                    fullStarArray.map((star) => {
                        return <StarRounded key={star} />
                    })
                } {
                    starHalves > 0 && starHalves < 1 ? <><StarHalfRounded /><NoStars /></> : null
                }
            </span>
        ) : null;
    }
    return (
        <Card className={classes.card}>
            <CardHeader title="Reviews" subheader={title + ' by ' + author} action={<Stars />} />
            <CardContent className={classes.content}>
                {/* 3 Reviews Go Here. To do: add a <CardActionArea /> to redirect to the reviews page. */}
                <span className={classes.info}>
                    <Typography className={classes.left} variant="subtitle2" gutterBottom>{rating + " stars"}</Typography>
                    <Typography className={classes.right} variant="subtitle2" gutterBottom>{raters + " reviews"}</Typography>
                </span>
            </CardContent>
        </Card>
    );
}