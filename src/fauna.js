export const addBook = (data) => {
    return fetch(
        '/.netlify/functions/add-book',
        {
            method: 'POST',
            body: data
        }  
    ).then(
        (response) => {
            return response.json();
        }
    ).catch(
        (error) => {
            console.error(error);
        }
    )
}
