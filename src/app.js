const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = Number(process.env.PORT) || 6000;
const { dbConnection } = require('./db/conn');
dbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', async (request, response) => {
    response.send("hello world")
})

const authRouter = require('./router/authentication');
const userRouter = require('./router/user');
const notesRouter = require('./router/notes');

app.use("/api/authentication", authRouter);
app.use("/api/user", userRouter);
app.use("/api/notes", notesRouter);


app.listen(port, () => {
    console.log(`Server is running port ${port}`);
})