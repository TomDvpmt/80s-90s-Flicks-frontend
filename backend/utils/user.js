const jwt = require("jsonwebtoken");

/** Create a token for a user
 *
 * @param {Object} user
 * @returns {String}
 */

const createToken = (user) => {
    return jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET_PHRASE, {
        expiresIn: "24h",
    });
};

module.exports = { createToken };
