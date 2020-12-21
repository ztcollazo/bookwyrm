import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Card, CardContent, CardHeader,  TextField } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";
// import { useQuery } from "react-query";
// import { useParams } from "react-router-dom";
// import { getBook } from "../../fauna";

// const queryBook = async (key, params) => await getBook(params);

const AddReview = () => {
    const [value, setValue] = React.useState(0);

    return (
        <Card>
            <CardHeader title="Add A Review" subheader={`Book: ${'Example'}`} />
            <CardContent>
                <TextField 
                    id="outlined-full-width" 
                    label="Review Name"
                    style={{margin: 8, width: '50%'}}
                    margin="normal"
                    variant="outlined"
                />
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => setValue(newValue)}
                />
                <TextField 
                    id="outlined-full-width" 
                    label="Your Review"
                    multiline
                    rows={3}
                    rowsMax={6}
                    style={{margin: 8}}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
            </CardContent>
        </Card>
    )
}

export default withAuthenticationRequired(AddReview);