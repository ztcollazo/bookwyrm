import React from "react";
import { useParams } from "react-router-dom";
import { getBook } from "../../fauna";
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import { useQuery } from "react-query";
import { makeStyles } from '@material-ui/core/styles';

const queryBook = async (key, params) => await getBook(params);

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  },
  media: {
    width: 128,
    flex: '1 0 auto',
  },
  flex: {
      display: 'flex',
      alignItems: 'stretch',
  }
});

export function Book(props) {
  const { isbn } = useParams() || props;
  const { data } = useQuery(['book', { ref: isbn }], queryBook);

  return <BookCard {...data} />;
}

export function BookCard(props) {
  const {title, authors, author, description, summary, isbn13, isbn10, isbn, image} = props;
  const { href } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.flex} href={ href ? href : null }>
        {image ? <CardMedia
          className={classes.media}
          image={image}
          title={title}
        /> : null}

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>

          <Typography gutterBottom variant="body2">
            by {authors ? authors.join(", ") : author || null}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            {description || summary || null}
          </Typography>

          <Typography variant="body2">ISBN: {isbn13 || isbn10 || isbn || null}</Typography>
        </CardContent>
      </CardActionArea>

      {href && (
        <CardActions>
            <Button size="small" color="primary" href={href}>
                View Book
            </Button>
        </CardActions>
      )}
    </Card>
  );
}

export default BookCard;
