const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: 'backend/config/config.env' })
// const path = require("path");
// dotenv.config({ path: path.join(__dirname, "./config.env") })
exports.db = () => {
    let DB = "";
    DB = process.env.DATABASE.replace(
        "<PASSWORD>",
        process.env.DATABASE_PASSWORD
    );

    mongoose
        .connect(DB)
        .then((con) =>
            console.log(`DB Connection successfully ${con.connection.host}`)
        )
}