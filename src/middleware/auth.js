const dotenv = require('dotenv');
dotenv.config();
const User = require('../model/User');
const jwt = require('jsonwebtoken')


exports.auth = async (request, response, next) => {
    try {

        const token = request.headers.authorization;
        if (!token) {
            return response.status(403).json({
                success: false,
                message: "Access Denied.",
            })
        }
        const jwtCode = process.env.JWT_SECRET_CODE
        const decode = await jwt.verify(token, jwtCode);

        if (!decode) {
            return response.status(403).json({
                success: false,
                message: "Access Denied.",
            })
        }
        const user = await User.findOne({ _id: decode._id }).lean()

        if (!user) {
            return response.status(403).json({
                success: false,
                message: "Access Denied.",
            })
        }

        request.user = user;
        next()

    } catch (error) {
        console.log("Error", error);
        return response.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}