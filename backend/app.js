// npm package
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const cors = require("cors");
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

const database = require('./config/dbConnect.js')
const logic = require('./utils/logic.js')

const rooms = {};
app.get('/healthcheck', (req, res) => {
    res.send('<h1>RPS App running...</h1>');
});

// handle uncaught Exception
process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
});

if (process.env.NODE_ENV !== "PRODUCTION") {
    // dotenv.config({ path: 'backend/config/config.env' })

}
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
})

// connection to database
database.db();

app.use(express.json());
app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true
// }))

app.use(cookieParser())

// import all routes
const authRoutes = require('./routes/authRoute.js')

// middlewares
app.use('/api/v1/auth', authRoutes)

io.on('connection', (socket) => {
    console.log("a user connection")
    socket.on('disconnect', () => {
        console.log("a user disconnection")
    })

    // create game
    socket.on('createGame', () => {
        const roomId = logic.makeid(6);
        console.log(roomId)
        rooms[roomId] = {}
        socket.join(roomId)
        socket.emit('newGame', { roomId: roomId })
    })
    socket.on('joinGame', (data) => {
        if (rooms[data.roomId] !== null) {
            socket.join(data.roomId);
            socket.to(data.roomId).emit("playersConnected", {});
            socket.emit('playersConnected')
        }
    })

    socket.on('player1Choice', (data) => {
        console.log(data)
        let playerValue = data.playerChoice;
        rooms[data.roomId].player1Choice = playerValue;
        console.log("player1Choice", rooms, playerValue)
        socket.to(data.roomId).emit("player1Choice", { playerChoice: data.playerChoice });
        if (rooms[data.roomId].player2Choice !== null) {
            let winner = logic.winningDeclare(rooms, data.roomId);
            console.log("winner", winner)
            io.sockets.to(data.roomId).emit('result', {
                winner: winner
            });
            // rooms[data.roomId].player1Choice = null
            // rooms[data.roomId].player2Choice = null
        }
    })

    socket.on('player2Choice', (data) => {
        let playerValue = data.playerChoice;
        rooms[data.roomId].player2Choice = playerValue;
        console.log("player2Choice", rooms, playerValue)
        socket.to(data.roomId).emit("player2Choice", { playerChoice: data.playerChoice });
        if (rooms[data.roomId].player1Choice !== null) {
            let winner = logic.winningDeclare(rooms, data.roomId);
            console.log("winner", winner)
            io.sockets.to(data.roomId).emit('result', {
                winner: winner
            });
            // rooms[data.roomId].player1Choice = null
            // rooms[data.roomId].player2Choice = null
        }
    })
})
server.listen(process.env.PORT, () => {
    console.log(`Server started on port: ${process.env.PORT} IN ${process.env.NODE_ENV} mode.`)
})
// handle unhandled Rejection
// on() is a event loop handler

process.on("unhandlerRejection", (err) => {
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});