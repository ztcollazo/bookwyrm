import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Button, Card, CardContent, CardHeader,  TextField } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { addReview, getBook, addReaction } from "../../fauna";
import { useAuth0 } from "@auth0/auth0-react";

const queryBook = async (key, params) => await getBook(params);

const AddReview = () => {
    const { isbn } = useParams();
    const [value, setValue] = React.useState(0);
    const [title, setTitle] = React.useState("");
    const [body, setBody] = React.useState("");
    const { data = {} } = useQuery(['get-book', {ref: isbn}], queryBook);
    const { user } = useAuth0();
    const history = useHistory();

    const setReview = async (params) => {
        var res = await addReview(params);
        await addReaction({
            user: user.email,
            value: "like",
            review: res.ref?.["@ref"].id
        });
        history.push(`/review/${isbn}`);
    }
    var date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = date.getFullYear();

    date = `${mm}/${dd}/${yyyy}`;

    return (
        <Card>
            <CardHeader title="Add A Review" subheader={`Book: ${data.title}`} />
            <CardContent>
                <TextField 
                    label="Review Name"
                    style={{margin: 8, width: '70%'}}
                    margin="normal"
                    variant="outlined"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <Rating
                    name="simple-controlled"
                    value={Number(value)}
                    onChange={(event) => setValue(event.target.value)}
                    size="large"
                    style={{float: 'right', margin: 10}}
                />
                <TextField
                    label="Your Review"
                    multiline
                    rows={3}
                    style={{margin: 8}}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                />
                <Button variant="outlined" style={{margin:10}} onClick={() => setReview({
                    title,
                    reviewer: user.email,
                    body: body,
                    date,
                    rating: value,
                    book: typeof isbn !== "string" ? String(isbn) : isbn
                })}>Submit Review</Button>
            </CardContent>
        </Card>
    )
}

export default withAuthenticationRequired(AddReview);