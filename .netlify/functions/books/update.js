import faunadb from "faunadb";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("../../../.env") });
const q = faunadb.query;
const books = new faunadb.Client({ secret: process.env.FAUNA_BOOKS_SERVER_KEY });

exports.handler = (event, context, callback) => {
    const data = event.body;
    const old = event.previous;
    const ref = old.isbn || old.ref
    console.log("Updating...");

    if (!ref && old) {
        return books.query(
            q.Update(
                q.Match(
                    q.Index('all-books'), 
                    old.title || old.author || old.summary
                )
            )
        )
        .then(
            (res) => {
                console.log("Success! ", res)

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
            (err) => {
                console.log("Error: ", err);

                return callback(
                    null,
                    {
                        statusCode: 400,
                        body: JSON.stringify(err)
                    }
                );
            }
        );
    } else if (ref) {
        return books.query(
            q.Update(
                q.Ref(
                    q.Collection('books'),
                    ref
                )
            )
        )
        .then(
            (res) => {
                console.log("Success! ", res)

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
            (err) => {
                console.log("Error: ", err);

                return callback(
                    null,
                    {
                        statusCode: 400,
                        body: JSON.stringify(err)
                    }
                );
            }
        );
    } else if (!ref && !old) {
        console.log("Error: reference or keywords not provided in proper place. Please add keywords in 'previous' object, or a 'ref' value.")
    }
}
