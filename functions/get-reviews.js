const faunadb = require("faunadb");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve("../../../.env") });

const q = faunadb.query;
const books = new faunadb.Client({ secret: process.env.FAUNA_BOOKS_SERVER_KEY });

exports.handler = async (event, _context, callback) => {
    console.log("Reading database...");
    const givenData = event.body;

    console.log(givenData);

    try {
        const res = await books.query(
            q.Map(
                q.Paginate(
                    q.Match(
                        q.Index(
                            'reviews_by_isbn'
                        ),
                        givenData
                    )
                ),
                q.Lambda(
                    'X',
                    q.Get(q.Var('X'))
                )
            )
        );
        const all = res.data;
        console.log(`Success! ${all.length} items found`);

        return callback(
            null,
            {
                statusCode: 200,
                body: JSON.stringify(all)
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
