import faunadb from "faunadb";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("../../../.env") });

const q = faunadb.query;
const books = new faunadb.Client({ secret: process.env.FAUNA_BOOKS_SERVER_KEY });

exports.handler = async (event, context, callback) => {
    const data = event.body;
    const item = data.title || data.author || data.summary;
    const ref = data.isbn || data.ref;

    console.log("Deleting book...");

    if (!ref && item) {
        try {
            const res = await books.query(
                q.Delete(
                    q.Match(
                        q.Index("all_books"),
                        item
                    )
                )
            );
            console.log("Success! ", res);
            return callback(
                null,
                {
                    statusCode: 200,
                    body: JSON.stringify(res)
                }
            );
        }
        catch (err) {
            console.log("Error: ", err);
            return callback(
                null,
                {
                    statusCode: 400,
                    body: JSON.stringify(err)
                }
            );
        }
    } else if (ref) {
        try {
            const res_1 = await books.query(
                q.Delete(
                    q.Ref(
                        q.Collection("books"),
                        ref
                    )
                )
            );
            console.log("Success! ", res_1);
            return callback(
                null,
                {
                    statusCode: 200,
                    body: JSON.stringify(res_1)
                }
            );
        }
        catch (err_1) {
            console.log("Error: ", err_1);
            return callback(
                null,
                {
                    statusCode: 400,
                    body: JSON.stringify(err_1)
                }
            );
        }
    } else if (!ref && !item) {
        console.log("Error: reference or data not provided in proper places. Please provide references or data");
    }
}