const faunadb = require("faunadb");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve("../../../.env") });

const q = faunadb.query;
const books = new faunadb.Client({ secret: process.env.FAUNA_BOOKS_SERVER_KEY });

exports.handler = async (event, _context, callback) => {
    const data = JSON.parse(event.body);
    console.log("Creating review...");
    const item = {
        data: data
    };

    try {
        const res = await books.query(
            q.Create(
                q.Collection('reviews'),
                item
            )
        );
        console.log("Sucess! ", res);
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
        return callback(
            null,
            {
                statusCode: 400,
                body: JSON.stringify(error)
            }
        );
    }
}