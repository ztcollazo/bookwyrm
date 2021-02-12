// POST /api/reviews/like

/**
 * {
 *  user: ref,
 *  value: 'like' | 'dislike' | 'heart',
 *  review: ref
 * } 
 */
/**
 * {
 *   likeCount: number,
 *   dislikeCount: number,
 *   userHasReacted: boolean,
 * }
 */

const faunadb = require("faunadb");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve("../../../.env") });

const q = faunadb.query;
const books = new faunadb.Client({ secret: process.env.FAUNA_BOOKS_SERVER_KEY });

exports.handler = async (event, _context, callback) => {
    const data = JSON.parse(event.body);
    console.log("Creating reaction...");
    const item = {
        data: {
            ...data,
            review: q.Ref(q.Collection('reviews'), data.review),
        }
    };

    try {
        const res = await books.query(
            q.Create(
                q.Collection('reactions'),
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