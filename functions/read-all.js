const faunadb = require("faunadb");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve("../../../.env") });

const q = faunadb.query;
const books = new faunadb.Client({ secret: process.env.FAUNA_BOOKS_SERVER_KEY });

exports.handler = async (event, _context, callback) => {
    /*
        ?sort_by=rating
        queryStringParameters = {
            sort_by: 'rating',
        }
    */
    const sort = event.queryStringParameters;
    console.log("Reading database...");
    try {
        var index;
        if (sort.sort_by === "rating") {
            index = "books_by_ratings";
        } else {
            index = "all_books";
        }
        var res = await books.query(
            q.Paginate(
                q.Match(
                    q.Index(index)
                )
            )
        );
        const all = res.data;
        console.log("Success! ", all.length, " items found");

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
