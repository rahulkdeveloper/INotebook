const express = require('express');
const router = express.Router();
const { register, login } = require('../controller/authentication');
const { body, } = require('express-validator')

router.post("/register",
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isLength({ min: 5 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Enter password atleast five character').isLength({ min: 5 }),
    register);

router.post("/login",
    body('email', 'Enter a valid Email').isLength({ min: 5 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Enter password atleast five character').isLength({ min: 5 }),
    login);

module.exports = router;