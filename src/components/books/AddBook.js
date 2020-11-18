import { 
    Button, 
    InputBase, 
    makeStyles, 
    Typography 
} from "@material-ui/core";
import React from "react";
import { addBook } from "../../fauna";
import { BookCard } from "./Book";
const isbn = require("node-isbn");

const useStyles = makeStyles(theme => ({
    input: {
        backgroundColor: '#bbbbbb',
        padding: '5px',
        borderRadius: theme.shape.borderRadius,
        margin: '2px',
        fontSize: '20px'
    },
    button: {
        margin: '2px'
    }
}));

const AddBook = () => {
    const [isbnInput, setIsbnInput] = React.useState("");
    const [book, setBook] = React.useState(null);
    const classes = useStyles();

    const get = async (isbnNum) => {
        const getIsbn = isbn.provider([isbn.PROVIDER_NAMES.GOOGLE]);
        console.log(isbnNum);

        return getIsbn.resolve(isbnNum).then(book => {
            console.log(book);
            let data = book;

            return {
                title: data.title,
                subtitle: data.subtitle,
                authors: data.authors,
                isbn10: data.industryIdentifiers[0].identifier,
                isbn13: data.industryIdentifiers[1].identifier ? data.industryIdentifiers[1].identifier : null,
                publisher: data.publisher,
                publishedDate: data.publishedDate,
                description: data.description,
                pageCount: data.pageCount,
                image: data.imageLinks.thumbnail,
                language: data.language,
                preview: data.previewLink,
                rating: data.averageRating,
                raters: data.ratingsCount,
                keywords: [
                    data.title,
                    data.authors,
                    data.description,
                    data.industryIdentifiers[0].isbn10,
                    data.industryIdentifiers[1].isbn13,
                    data.publisher,
                    data.title + " by " + data.authors,
                    data.title.toLocaleLowerCase(),
                    data.authors.join(' and ' || ', ').toLocaleLowerCase(),
                    data.authors[0].toLocaleLowerCase(),
                    data.authors.join(' and ' || ', '),
                    data.authors[0],
                    data.title.toLocaleLowerCase() + ' by ' + data.authors.join(' and ', ', ').toLocaleLowerCase()
                ]
            };
        }).catch(
            (err) => {
                console.error(err);
            }
        );
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addBook(
            JSON.stringify(book)
        );
    }

    const handleClick = async () => {
        const book = await get(isbnInput);
        setBook(book);
    }

    const handleChange = (event) => {
        event.preventDefault();
        setIsbnInput(event.target.value);
    }

    return (
        <>
            <Typography variant='h6'>Add a Book to BookWyrm</Typography>
            <form onSubmit={handleSubmit}>
                <InputBase classes={{ input: classes.input, root: classes.root }} onChange={handleChange} id="isbn" type="text" placeholder="Book ISBN" />
                <Button className={ classes.button } variant='outlined' type="button" onClick={handleClick} >Get Book</Button>

                {book ? <BookCard {...book} /> : null}
                <Button className={ classes.button } variant='outlined' disabled={!book} type="submit">Add Book</Button>
            </form>
            <div id="message"><strong style={{ color: "red" }}></strong></div>
        </>
    );
}

export default AddBook;