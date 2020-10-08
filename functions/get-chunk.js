const faunadb = require("faunadb");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve("../../../.env") });

const q = faunadb.query;
const books = new faunadb.Client({ secret: process.env.FAUNA_BOOKS_SERVER_KEY });

exports.handler = async (event, _context, callback) => {
    console.log("Reading database...");
    const givenData = event.body;
    try {
        const res = await books.query(
            q.Paginate(
                q.Match(
                    q.Index(
                        'all_books'
                    ),
                    givenData
                )
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
        const data = ret.map(
            (bookRefs) => {
                return bookRefs.data;
            }
        )
        return callback(
            null,
            {
                statusCode: 200,
                body: JSON.stringify(data)
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
