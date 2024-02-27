const jwt = require("jsonwebtoken");
const User = require("../models/User");
const verifyToken = async (req, res, next) => {
    try {
        const reqHeader = req.header("Authorization").split(" ");
        const token = reqHeader[1];
        // const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        console.log(token)
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decode.userId;

        // Check if user exists in the database
        console.log(decode.userId)
        const isUser = await User.findById(req.userId); // Replace 'User' with your User model
        if (!isUser) {
            return res.status(401).json({ message: "Unauthorized access" });
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = verifyToken;
