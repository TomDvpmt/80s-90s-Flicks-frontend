const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_PHRASE);
        const userId = decodedToken.userId;
        req.auth = { id: userId };
        next();
    } catch (error) {
        res.status(401);
        throw new Error("Non autorisé.");
    }
};

module.exports = { auth };
