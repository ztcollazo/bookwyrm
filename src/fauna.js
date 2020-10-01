export const addBook = async (data) => {
    try {
        const response = await fetch(
            '/.netlify/functions/add-book',
            {
                method: 'POST',
                body: data
            }
        );
        return response.json();
    }
    catch (error) {
        console.error(error);
    }
}

export const getAllBooks = async () => {
    try {
        const response = await fetch(
            "/.netlify/functions/read-all",
            {
                method: 'GET'
            }
        );
        if (!response.bodyUsed) {
            return response.json();
        }else response.clone();
    }
    catch (error) {
        console.error(error);
    }
}
