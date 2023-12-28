const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = Number(process.env.PORT) || 7000;
const { dbConnection } = require('./db/conn');
const { response } = require('express');
dbConnection();

app.get('/', async (request, response) => {
    response.send("hello world")
})


app.listen(port, () => {
    console.log(`Server is running port ${port}`);
})