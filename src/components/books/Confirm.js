import React from "react";
import { title, author, summary } from "./AddBook";

class Confirm extends React.Component {
    render() {
        return (
            <>
                <h2>Is this correct?</h2>
                <div>
                    <h4>Title: {title}</h4>
                    <h4>Author: {author}</h4>
                    <h4>Summary: {summary}</h4>
                </div>
            </>
        )
    }
}

export default Confirm;