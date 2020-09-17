import faunadb from "faunadb";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("../../../.env") });

const q = faunadb.query,
books = new faunadb.Client({ secret: process.env.FAUNA_BOOKS_SERVER_KEY });

exports.handler = async (event, context, callback) => {
    const data = event.body;
    const item = data.title || data.author || data.summary;
    const ref = data.isbn || data.ref;

    console.log("Getting book...");

    if (!ref && item) {
        try {
            const res = await books.query(
                q.Match(
                    q.Index('all_books'),
                    item
                )
            );
            console.log("Book found!");
            return callback(
                null,
                {
                    statusCode: 200,
                    body: JSON.stringify(res)
                }
            );
        }
        catch (error) {
            console.log("Error: ", error);

            callback(
                null,
                {
                    statusCode: 400,
                    body: JSON.stringify(error)
                }
            );
        }
    } else if (ref) {
        try {
            const res_1 = await books.query(
                q.Get(
                    q.Ref(
                        q.Collection('books'),
                        data.ref
                    )
                )
            );
            console.log("Book found!");
            return callback(
                null,
                {
                    statusCode: 200,
                    body: JSON.stringify(res_1)
                }
            );
        }
        catch (error_1) {
            console.log("Error: ", error_1);

            callback(
                null,
                {
                    statusCode: 400,
                    body: JSON.stringify(error_1)
                }
            );
        }
    } else if (!ref && !item) {
        console.log("Error: reference or data not provided in proper place. please provide a reference under 'ref' or information on book");
    }
}


