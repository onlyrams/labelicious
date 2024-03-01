export const handler = async (event) => {
    const value = process.env.POSTGRES_USER;

    return {
        statusCode: 200,
        body: JSON.stringify({ message: `Value of MY_IMPORTANT_VARIABLE is ${value}.` }),
    };

    // Netlify Functions need to return an object with a statusCode
    // Other properties such as headers or body can also be included.
    return {
        statusCode: 200,
        body: JSON.stringify(randomJoke)
    }
}
