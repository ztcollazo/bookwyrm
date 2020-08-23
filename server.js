import mongoose from "mongoose";

mongoose.connect(
    process.env.BOOKS_URI,
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    }
);