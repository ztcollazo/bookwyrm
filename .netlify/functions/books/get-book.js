import faunadb from "faunadb";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("./.env") });

const q = faunadb.query,
books = new faunadb.Client({ secret: process.env.FAUNA_BOOKS_SERVER_KEY });

exports.handler = (event, context, callback) => {
    const data = event.body;
    const item = {
        data: data
    };
    console.log("Getting book...");
    return books.query(
        q.Get(
            q.Ref(
                q.Collection('books'),
                item.ref
            )
        )
    )
    .then(
        (res) => {
            console.log("Book found!");

            return callback(
                null,
                {
                    statusCode: 200,
                    body: JSON.stringify(res)
                }
            );
        }
    )
    .catch(
        (error) => {
            console.log("Error: ", error);

            callback(
                null,
                {
                    statusCode: 400,
                    body: JSON.stringify(error)
                }
            );
        }
    );
}


