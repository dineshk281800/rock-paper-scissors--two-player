exports.makeid = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

exports.winningDeclare = (rooms, roomId) => {
    let player1Choice = rooms[roomId].player1Choice
    let player2Choice = rooms[roomId].player2Choice
    let winner = null;
    if (player1Choice === player2Choice) {
        return winner = "tie";
    } else if (player1Choice === "Rock") {
        if (player2Choice === "Paper") {
            return winner = "player2";
        } else {
            return winner = "player1";
        }
    } else if (player1Choice === "Paper") {
        if (player2Choice === "Scissors") {
            return winner = "player2";
        } else {
            return winner = "player1";
        }
    } else if (player1Choice === "Scissors") {
        if (player2Choice === "Paper") {
            return winner = "player1";
        } else {
            return winner = "player2";
        }
    }

    // io.sockets.to(roomId).emit('result', {
    //     winner: winner
    // });
    // rooms[roomId].player1Choice = null
    // rooms[roomId].player2Choice = null
}