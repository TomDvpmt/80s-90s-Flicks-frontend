const displayBigNumber = (rawNumber) => {
    const arr = rawNumber.toString().split("");
    for (let i = arr.length - 1; i >= 0; i--) {
        if ((arr.length - i) % 3 === 0 && i !== 0) {
            arr[i] = `,${arr[i]}`;
        }
    }
    const bigNumber = arr.join("");
    return bigNumber;
};

export default displayBigNumber;
