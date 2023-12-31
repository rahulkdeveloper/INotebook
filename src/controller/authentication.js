const User = require("../model/User");
const { validationResult } = require('express-validator');
const { comparePassword, hashPassword } = require('../utils/utils');
const jwt = require('jsonwebtoken');
const { request, response } = require('express')

exports.register = async (request, response) => {
    try {

        const { password, email } = request.body

        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        // check user alredy exist or not...
        const findUser = await User.findOne({ email }).lean();

        if (findUser) {

            return response.status(400).json({
                success: false,
                message: "Email already exist",
            })
        }



        request.body.password = await hashPassword(password)
        const newUser = new User(request.body);
        const user = await newUser.save();

        // generate jwt token...
        const jwtCode = process.env.JWT_SECRET_CODE
        const accessToken = await jwt.sign({ _id: user._id }, jwtCode);


        return response.status(201).json({
            success: true,
            message: "Register Successfully",
            data: user,
            accessToken
        })

    } catch (error) {
        console.log("Error", error);
        return response.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}

exports.login = async (request, response) => {
    try {

        const { email, password } = request.body

        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        // check user alredy exist or not...
        const findUser = await User.findOne({ email }).lean();

        if (!findUser) {

            return response.status(400).json({
                success: false,
                message: "Please login with correct credentials.",
            })
        }

        // compare password...
        const isPasswordValid = await comparePassword(password, findUser.password);
        if (!isPasswordValid) {
            return response.status(400).json({
                success: false,
                message: "Please login with correct credentials.",
            })
        }


        // generate jwt token...
        const jwtCode = process.env.JWT_SECRET_CODE
        const accessToken = await jwt.sign({ _id: findUser._id }, jwtCode);


        return response.status(201).json({
            success: true,
            message: "Register Successfully",
            accessToken
        })

    } catch (error) {
        console.log("Error", error);
        return response.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}