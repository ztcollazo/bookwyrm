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
    IconButton,
    Avatar,
    Button,
    FormControl,
    Select,
    MenuItem,
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
    },
    topCards: {
        display: 'flex'
    },
    rightCards: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        margin: 10,
        marginTop: 0,
        marginBottom: 0,
        textAlign: 'center',
    },
    write: {
        padding: 10
    },
    sort: {
        marginTop: 10,
        padding: 10
    }
}));

const WriteReviewCard = ({isbn}) => {
    const classes = useStyles();

    return (
        <Card className={classes.write}>
            <Button variant="outlined" component={Link} to={`/write-review/${isbn}`}>Write A Review</Button>
        </Card>
    )
}

const SortBy = () => {
    const classes = useStyles();
    const [filter, setFilter] = React.useState('');
    const [sort, setSort] = React.useState('');

    const handleChange = (event) => {
        setFilter(event.target.value);
    }

    const handleSort = (event) => {
        setSort(event.target.value);
    }

    return (
        <Card className={classes.sort}>
            <FormControl variant="outlined">
                <Select
                    labelId="simple-select-outlined-label" 
                    id="demo-simple-select-outlined"
                    value={sort}
                    onChange={handleSort}
                    displayEmpty
                >
                    <MenuItem value="" disabled><em>Sort Reviews</em></MenuItem>   
                    <MenuItem value={5}>Newest</MenuItem>
                    <MenuItem value={4}>Oldest</MenuItem>
                    <MenuItem value={3}>Least to greatest</MenuItem>
                    <MenuItem value={2}>Greatest to Least</MenuItem>
                    <MenuItem value={2}>Most Votes</MenuItem>
                    <MenuItem value={2}>Least Votes</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="outlined">
                <Select
                    labelId="simple-select-outlined-label" 
                    id="demo-simple-select-outlined"
                    value={filter}
                    onChange={handleChange}
                    displayEmpty
                >
                    <MenuItem value="" disabled><em>Filter Reviews</em></MenuItem>   
                    <MenuItem value={5}>Five Stars</MenuItem>
                    <MenuItem value={4}>Four Stars & greater</MenuItem>
                    <MenuItem value={3}>Three Stars & greater</MenuItem>
                    <MenuItem value={2}>Two Stars & greater</MenuItem>
                </Select>
            </FormControl>
        </Card>
    )

}

export const ReviewCard = ({title, authors = [], rating, raters, isbn13}) => {
    const classes = useStyles();
    var author = authors.length > 1 ? authors.join(", ") : authors[0];

    return (
        <Card className={classes.card}>
            <CardActionArea component={Link} to={`/review/${isbn13}`} className={classes.action}>
                <CardHeader title="Reviews" subheader={title + ' by ' + author} action={<Rating value={Math.round(rating)} readOnly />} />
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
            <CardHeader avatar={<Avatar>{"John Doe".split(" ")[0][0] + "John Doe".split(" ")[1][0]}</Avatar>} title="An OK book" subheader="John Doe" action={<Rating value={3} readOnly />} />
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
    const classes = useStyles();
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
            <div className={classes.topCards}>
                <BookCard {...data} />
                <div className={classes.rightCards}>
                    <WriteReviewCard isbn={isbn} />
                    <SortBy />
                </div>
            </div>
            <div>
                {[1,2,3,4,5].map((i) => (<SingleReview key={i} />))}
            </div>
        </>
    );
}