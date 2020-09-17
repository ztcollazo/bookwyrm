import faunadb from "faunadb";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("../../../.env") });
const q = faunadb.query;
const books = new faunadb.Client({ secret: process.env.FAUNA_BOOKS_SERVER_KEY });

exports.handler = async (event, context, callback) => {
    console.log("Reading database...");
    try {
        const res = await books.query(
            q.Paginate(
                q.Collection('books')
            )
        );
        const all = res.data;
        console.log("Success! ${all.length} items found");

        const getAll = all.map(
            (ref) => {
                return q.Get(ref);
            }
        );
        const ret = await books.query(getAll);
        return callback(
            null,
            {
                statusCode: 200,
                body: JSON.stringify(ret)
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
}