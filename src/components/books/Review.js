import { useQuery, useMutation, useQueryCache } from "react-query";
import { useParams } from "react-router-dom";
import { addReaction, getBook, getReviews } from "../../fauna";
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
    // Avatar,
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
import { useAuth0 } from "@auth0/auth0-react";
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
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
    flexContainer: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    justifyBetween: {
        justifyContent: 'space-between',
    },
    rightCards: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        margin: 10,
        marginTop: 0,
        marginBottom: 0,
        textAlign: 'center',
        flex: '1 0 350px'
    },
    write: {
        padding: 10,
    },
    sort: {
        marginTop: 10,
        padding: 10
	},
	select: {
		marginLeft: 16,
    },
    emailLink: {
        color: "darkgrey",
        textDecoration: "none",
        '&:hover': {
            textDecoration: "underline"
        }
    }
}));

const WriteReviewCard = ({isbn}) => {
    return <Button variant="contained" color="primary" component={Link} to={`/write-review/${isbn}`}>Write A Review</Button>;
}

const SortBy = ({sort, setSort, filter, setFilter}) => {
    const classes = useStyles();

    const handleChange = (event) => {
        setFilter(event.target.value);
    }

    const handleSort = (event) => {
        setSort(event.target.value);
    }

    return (
            <>
                <FormControl>
                    <Select
                        className={classes.select}
                        labelId="simple-select-outlined-label" 
                        id="simple-select-outlined"
                        value={sort}
                        onChange={handleSort}
                        displayEmpty
                    >   
                        <MenuItem value="newest">Newest</MenuItem>
                        <MenuItem value="oldest">Oldest</MenuItem>
                        <MenuItem value="least">Least to greatest</MenuItem>
                        <MenuItem value="greatest">Greatest to Least</MenuItem>
                        <MenuItem value="most">Most Votes</MenuItem>
                        <MenuItem value="lowest">Least Votes</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.select}>
                    <Select
                        labelId="simple-select-outlined-label" 
                        id="simple-select-outlined"
                        value={filter}
                        onChange={handleChange}
                        displayEmpty
                    >   
                        <MenuItem value={5}>Five Stars</MenuItem>
                        <MenuItem value={4}>Four Stars & greater</MenuItem>
                        <MenuItem value={3}>Three Stars & greater</MenuItem>
                        <MenuItem value={2}>Two Stars & greater</MenuItem>
                        <MenuItem value="">All</MenuItem>
                    </Select>
                </FormControl>
            </>

    )

}

export const ReviewCard = ({title, authors = [], rating, raters, isbn13, className}) => {
    const classes = useStyles();
    var author = authors.length > 1 ? authors.join(", ") : authors[0];

    return (
        <Card className={className}>
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

// const memo = {
//     'filterData': funcReturn,
//     'otherFilterData': funcReturn,
// }

// function memoize(func, [filter, data]) {
//     if (!filter.toString() + data.toString() in memo) {
//         memo["2" + '{title: "stuff"}'] = func();
//     }
//     return memo[filterData];
// } 

const SingleReview = (props) => {
    const classes = useStyles();
    const { user, isAuthenticated } = useAuth0();
    const [likeCount, setLikeCount] = React.useState(0);
    const [dislikeCount, setDislikeCount] = React.useState(0);
    const queryClient = useQueryCache();
    const [mutate] = useMutation(addReaction, {
        onSuccess: (variables) => {
            queryClient.invalidateQueries(['get-reviews', { book: props.book }]);
        }
    })

    const buttonIsDisabled = !isAuthenticated || props.reactions.some((reaction) => {
        return reaction.user === user.email;
    });

    React.useEffect(() => {
        const countReactions = (reactions) => {
            var likeCount = 0;
            var dislikeCount = 0;

            for (let i of reactions) {
                if (i.value === "like") {
                    likeCount++;
                } else if (i.value === "dislike") {
                    dislikeCount++;
                }
            }

            setLikeCount(likeCount);
            setDislikeCount(dislikeCount);
        }

        countReactions(props.reactions);
    }, [props.reactions]);

    const createReaction = async (event) => {
        const reaction = {
            user: user.email,
            value: event.currentTarget.id,
            review: props.id
        }
        console.log(props.id);
        await mutate(reaction);
    }

    return (
        <Card className={classes.review} >
            <CardHeader title={props.title} subheader={<a className={classes.emailLink} target="_blank" rel="noopener noreferrer" href={`https://mailto:${props.reviewer}`}>{props.reviewer}</a>} action={<Rating value={Number(props.rating)} readOnly />} />
            <CardContent>
                <Typography>{props.body}</Typography>
            </CardContent>
            <CardActions>
                <IconButton disabled={buttonIsDisabled} onClick={createReaction} id="like"><ThumbUpRounded /></IconButton>
                <Typography>{likeCount}</Typography>
                <IconButton disabled={buttonIsDisabled} onClick={createReaction} id="dislike"><ThumbDownRounded /></IconButton>
                <Typography>{dislikeCount}</Typography>
            </CardActions>
        </Card>
    )
}

const queryBook = async (key, params) => await getBook(params);
const queryReviews = async (key, params) => await getReviews(params);

export const ReviewPage = () => {
    const classes = useStyles();
    const { isbn } = useParams();
	const { data = {} } = useQuery(['book', { ref: isbn }], queryBook);
    const reviews = useQuery(['get-reviews', { book: isbn }], queryReviews);
    const [filter, setFilter] = React.useState("");
    const [sort, setSort] = React.useState("newest");

    const filteredReviews = React.useMemo(() => {
        if (!reviews.data || reviews.data.length === 0) {
            return [];
        } else if (!filter) {
            return reviews.data;
        }

        return reviews.data.filter(review => {
            return parseInt(review.data.rating) >= parseInt(filter);
        });
    }, [filter, reviews]);

    const sortArrayByRating = (order) => (a, b) => {
        if (order === "greatest") {
            if (a.data.rating >= b.data.rating) {
                return -1;
            }
            return 1;
        } 
        if (a.data.rating <= b.data.rating) {
            return -1;
        }
        return 1;
    }

    const sortByLikes = (order) => (a, b) => {
        if (order === "most") {
            if (a.data.likes > b.data.likes) {
                return -1;
            }
            return 1;
        }
        if (a.data.likes < b.data.likes) {
            return -1;
        }
        return 1;
    }

    const sortByDate = (order) => (a, b) => {
        console.log(a);
        const aDate = {
            year: parseInt(a.data.date.split("/")[2]),
            month: parseInt(a.data.date.split("/")[0]),
            day: parseInt(a.data.date.split("/")[1])
        }
        const bDate = {
            year: parseInt(b.data.date.split("/")[2]),
            month: parseInt(b.data.date.split("/")[0]),
            day: parseInt(b.data.date.split("/")[1])
        }

        if (order === "newest") {
            if (aDate.year > bDate.year) {
                return -1;
            } else if (aDate.year === bDate.year) {
                if (aDate.month > bDate.month) {
                    return -1;
                } else if (aDate.month === bDate.month) {
                    if (aDate.day > bDate.day) {
                        return -1;
                    }
                    return 1;
                }
                return 1;
            }
            return 1;
        }
        if (aDate.year > bDate.year) {
            return 1;
        } else if (aDate.year === bDate.year) {
            if (aDate.month > bDate.month) {
                return 1;
            } else if (aDate.month === bDate.month) {
                if (aDate.day > bDate.day) {
                    return 1;
                }
                return -1;
            }
            return -1;
        }
        return -1;
    }

    const sortedReviews = React.useMemo(() => {
        switch (sort) {
            case "greatest":
            case "least":
                return filteredReviews.length > 0 ? filteredReviews.sort(sortArrayByRating(sort)) : [];
            case "newest":
            case "oldest":
                return filteredReviews.length > 0 ? filteredReviews.sort(sortByDate(sort)) : [];
            case "most":
            case "lowest":
                return filteredReviews.length > 0 ? filteredReviews.sort(sortByLikes(sort)) : [];;
            default:
                return filteredReviews    
        }
    }, [sort, filteredReviews])

    /* 
        {
            data: {
                title: string,
                reviewer: string,
                body: string,
                rating: integer,
                likes: integer,
                book: integer - the isbn
            },
            ref: string,
    */

    return (
        <div style={{maxWidth: 880, margin: '0 auto'}}>
            <BookCard style={{margin: 0}} {...data} pageHref={`/book/${data.isbn13}`} />
            <div>
                <div style={{marginTop: 30, marginBottom: 30}} className={clsx(classes.flexContainer, classes.justifyBetween)}>
                    <WriteReviewCard isbn={isbn} />
                    <div>
                        <SortBy setFilter={setFilter} setSort={setSort} filter={filter} sort={sort} />
                    </div>
                </div>
                {sortedReviews && sortedReviews.length > 0 ? sortedReviews.map((i, k) => (<SingleReview {...i.data} id={i.ref?.['@ref'].id} key={k} />)) : <Typography>Sorry, nothing to see here.</Typography>}
            </div>
        </div>
    );
}