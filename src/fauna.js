// @flow

interface BookSchema {
    title: string,
    subtitle: string,
    authors: Array<string>,
    isbn10?: string,
    isbn13: string,
    publisher?: string,
    publishedDate?: string,
    description: string,
    pageCount?: Number,
    image: string,
    language?: string,
    preview?: string,
    rating: Number,
    raters: Number,
    keywords: Array<string>
}

interface BookQuery {
    ref: string
}

interface ReviewSchema {
    title: string,
    reviewer: string,
    body: string,
    date: string,
    rating: Number,
    likes: Number,
    book: string,
    dislikes: Number
}

interface ReviewQuery {
    book: string,
    ratingGreaterThan?: Number,
    ratingLessThan?: Number
}

export const addBook = async (data: BookSchema): Object => {
    try {
        const response = await fetch(
            '/.netlify/functions/add-book',
            {
                method: 'POST',
                body: JSON.stringify(data)
            }
        );
        const json = await response.json();
        console.log(json);
        return json;
    }
    catch (error) {
        console.error(error);
    }
}

export const getAllBooks = async (): Object => {
    try {
        const response = await fetch(
            "/.netlify/functions/read-all",
            {
                method: 'GET'
            }
        );
        const json = await response.json();
        console.log(json);
        return json;
    }
    catch (error) {
        console.error(error);
    }
}

export const getChunkOfBooks = async (data: BookQuery): Object => {
    try {
        const response = await fetch(
            "/.netlify/functions/get-chunk",
            {
                method: 'POST',
                body: JSON.stringify(data)
            }
        );
        var json = await response.json();
        console.log(json);
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const getBook = async (data: BookQuery): Object => {
    try {
        const response = await fetch(
            "/.netlify/functions/get-book",
            {
                method: 'POST',
                body: JSON.stringify(data)
            }
        );
        var json = await response.json();
        console.log(json);
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const addReview = async (data: ReviewSchema): Object => {
    try {
        const response = await fetch(
            "/.netlify/functions/add-review",
            {
                method: "POST",
                body: JSON.stringify(data)
            }
        )
        var json = await response.json()
        console.log(json);
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const getReviews = async (data: ReviewQuery): Object => {
    try {
        const response = await fetch(
            "/.netlify/functions/get-reviews",
            {
                method: "POST",
                body: JSON.stringify(data)
            }
        )
        var json = await response.json()
        console.log(json);
        return json;
    } catch (error) {
        console.error(error);
    }
}
