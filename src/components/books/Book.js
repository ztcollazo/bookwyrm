import React from "react";
import { useParams } from "react-router-dom";
import { getBook } from "../../fauna";
import humanizeString from "humanize-string";
import { 
  Button, 
  Card, 
  CardActionArea, 
  // CardActions, 
  CardContent, 
  CardMedia, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography 
} from "@material-ui/core";
import { useQuery } from "react-query";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import { ReviewCard } from "./Review";
import clsx from "clsx";

const queryBook = async (key, params) => await getBook(params);

const useStyles = makeStyles({
  media: {
    width: 128,
    flex: '1 0 auto',
  },
  flex: {
      display: 'flex',
      alignItems: 'flex-start',
  },
  columns: {
    width: '150px'
  },
  cards: {
    display: 'flex',
  },
  card: {
    flex: '1 0 50%',
  }
});

export function Book(props) {
  const { isbn } = useParams() || props;
  const { data = null } = useQuery(['book', { ref: isbn }], queryBook);

  return <BookCard {...data} />;
}

export function BookCard(props) {
  const { title, authors, description, isbn13, isbn10, image, subtitle } = props;
  const { pageHref, reviewHref, className } = props;
  const classes = useStyles();

  return (
    <Card className={clsx(classes.card, className)}>
      <CardActionArea className={classes.flex} component={Link} to={ pageHref ? pageHref : window.location.pathname }>
        {image ? <CardMedia
          component="img"
          className={classes.media}
          image={image}
          title={title}
        /> : null}

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>

          {
            subtitle && <Typography gutterBottom variant="h6" component="h3">{subtitle}</Typography>
          }

          <Typography gutterBottom variant="body2">
            by {authors && authors.length > 1 ? authors.join(", ") : authors  ? authors[0] : null}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            {description || null}
          </Typography>

          <Typography variant="body2">ISBN: {isbn13 || isbn10 || null}</Typography>

          {pageHref && reviewHref && (
            <>
              <Button style={{marginTop: 10}} size="small" color="primary" variant="outlined" component={Link} to={pageHref}>
                  View Book
              </Button>
              <Button style={{marginTop: 10, marginLeft: 10}} size="small" color="primary" variant="outlined" component={Link} to={reviewHref}>
                  Review Book
              </Button>
            </>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export const BookPage = () => {
  const { isbn } = useParams();
  const { data = {} } = useQuery(['book', { ref: isbn }], queryBook);
  const excluded = ['keywords', 'preview', 'image'];
  const classes = useStyles();

  var tableData = Object.keys(data).filter(key => {
    return !excluded.includes(key);
  });

  const formatStrings = (text) => {
    if (!text.includes("isbn")) {
      return humanizeString(text);
    } else {
      return text.replace("isbn", "ISBN-");
    }
  }

  return (
    <>
      <div className={classes.cards}>
        <BookCard {...data} />
        <ReviewCard {...data} />
      </div>
      <TableContainer component={Paper} style={{marginTop: 20}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.columns}>Key</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              tableData.map(key => (
                <TableRow key={key}>
                    <TableCell className={classes.columns} >{formatStrings(key)}</TableCell>
                    <TableCell>{data[key]}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default BookCard;
