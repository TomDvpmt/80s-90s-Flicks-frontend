/** Fetch data from an API
 *
 * @param {String} endpoint
 * @param {Object} config
 * @returns {Object}
 */

async function fetchData(endpoint, config) {
    try {
        const response = await fetch(endpoint, config);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export default fetchData;
