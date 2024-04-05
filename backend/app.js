// npm package
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')

const app = express();

const database = require('./config/dbConnect.js')

// handle uncaught Exception
process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
});

if (process.env.NODE_ENV !== "PRODUCTION") {
    dotenv.config({ path: 'backend/config/config.env' })
}

// connection to database
database.db();

app.use(express.json());

app.use(cookieParser())

// import all routes
const authRoutes = require('./routes/authRoute.js')

// middlewares
app.use('/api/v1/auth', authRoutes)

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on port: ${process.env.PORT} IN ${process.env.NODE_ENV} mode.`)
});


// handle unhandled Rejection
// on() is a event loop handler

process.on("unhandlerRejection", (err) => {
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});