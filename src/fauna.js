// @flow

export const addBook = async (data: Object): Object => {
    try {
        const response = await fetch(
            '/.netlify/functions/add-book',
            {
                method: 'PUT',
                body: data,
                headers: {
                    contentType: 'application/json'
                }
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

export const getChunkOfBooks = async (data: any): Object => {
    try {
        const response = await fetch(
            "/.netlify/functions/get-chunk",
            {
                method: 'POST',
                body: data
            }
        );
        var json = await response.json();
        console.log(json);
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const getBook = async (data: Object): Object => {
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
