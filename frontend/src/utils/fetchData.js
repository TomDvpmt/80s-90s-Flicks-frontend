/** Fetch data from an API
 *
 * @param {String} endpoint
 * @param {String} method
 * @param {Object} headers
 * @param {Object} body
 * @returns {Object}
 */

async function fetchData(endpoint, method, headers, body) {
    try {
        const response = await fetch(endpoint, {
            method: method,
            headers: headers,
            body: body,
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export default fetchData;
