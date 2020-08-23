import mongoose from "mongoose";

mongoose.connect(
    process.env.BOOKS_URI,
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    }
);
console.log("Hello World")
var book = new mongoose.Schema(
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
        },
    }
);