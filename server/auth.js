const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.createAccessToken = (user) => {
    const data = {
        id: user._id,
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin
    };

    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1d" });
};

module.exports.verify = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).send({
            auth: "Failed",
            message: "No token provided"
        });
    } else {
        token = token.slice(7, token.length);

        jwt.verify(token, process.env.JWT_SECRET, function(error, decodedToken) {
            if (error) {
                return res.status(403).send({
                    auth: "Failed",
                    message: error.message
                });
            } else {
                req.user = decodedToken;
                next();
            }
        });
    }
};

module.exports.verifyAdmin = (req, res, next) => {
    if (req.user.isAdmin === true) {
        next();
    } else {
        return res.status(403).send({
            auth: "Failed",
            message: "Action Forbidden"
        });
    }
};

module.exports.errorHandler = (error, req, res, next) => {
    const statusCode = error.status || 500;
    const errorMessage = error.message || "Internal Server Error";

    return res.status(statusCode).send({
        message: errorMessage
    });
};
