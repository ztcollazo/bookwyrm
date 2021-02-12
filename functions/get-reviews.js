const faunadb = require("faunadb");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve("../../../.env") });

const q = faunadb.query;
const books = new faunadb.Client({ secret: process.env.FAUNA_BOOKS_SERVER_KEY });

exports.handler = async (event, _context, callback) => {
    console.log("Reading database...");
    const givenData = JSON.parse(event.body);
    var book = String(givenData.book);
    console.log(book);

    const getReactions = async (x) => {
        var reactions = await books.query(
            q.Map(
                q.Paginate(
                    q.Match(
                        q.Index("reactions_by_review"),
                        x
                    )
                ),
                q.Lambda(
                    'Z',
                    q.Get(q.Var('Z'))
                )
            ) 
        );
        return reactions;
    }

    console.log(givenData);

    try {
        const res = await books.query(
            q.Paginate(
                q.Match(
                    q.Index(
                        'reviews_by_isbn'
                    ),
                    book
                )
            )
        );
        console.log(res);
        const ret = res.data.map(async (i) => {
            var info = await books.query(q.Get(i));
            return {
                data: {
                    reactions: (await getReactions(i)).data.map(i => i.data),
                    ...info.data
                },
                ref: i
            }
        })
        const all = await Promise.all(ret);
        console.log(all);
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

