/**
 * Insert commas in a big number
 * @param {Number} rawNumber
 * @returns {Number}
 */

export const displayBigNumber = (rawNumber) => {
    if (rawNumber !== null && rawNumber !== undefined) {
        const arr = rawNumber.toString().split("");
        for (let i = arr.length - 1; i >= 0; i--) {
            if ((arr.length - i) % 3 === 0 && i !== 0) {
                arr[i] = `,${arr[i]}`;
            }
        }
        const bigNumber = arr.join("");
        return bigNumber;
    }
};

/**
 * Check if an object is empty
 * @param {Object} objectToCheck
 * @returns {Boolean}
 */

export const isEmptyObject = (objectToCheck) => {
    return (
        Object.keys(objectToCheck).length === 0 &&
        objectToCheck.constructor === Object
    );
};
