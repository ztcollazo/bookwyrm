import mongoose from "mongoose";

export default (

    mongoose.connect(
        process.env.BOOKS_URI,
        { 
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        }
    )
);

export var book = new mongoose.Schema(
    {
        bookTitle: {
            type: String,
            required: true
        },
        bookAuthor: {
            type: String,
            required: true
        },
        bookSummary: {
            type: String,
            required: true
        }
    }
);

export var NewBook = mongoose.Model();