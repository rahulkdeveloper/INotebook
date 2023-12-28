const mongoose = require("mongoose");

function dbConnection() {
    const url = process.env.DATABASE_URL;
    mongoose.connect(url)
        .then(() => console.log("db connected..."))
        .catch((err) => console.log("Error in connected db", err))
}

module.exports = { dbConnection };