import React, { useEffect, useState } from 'react'
import './playerLayout.css'
import { io } from 'socket.io-client'
// import MetaData from './MetaData';
const socket = io('localhost:8000')

function CopyCodeButton({ roomId }) {
    const handleClick = () => {
        navigator.clipboard.writeText(roomId)
            .then(() => {
                console.log('Async: Copying to clipboard was successful!');
            })
            .catch((err) => {
                console.error('Async: Could not copy text: ', err);
            });
    };

    return (
        <button
            className="btn btn-primary py-2 my-2"
            onClick={handleClick}
        >
            Copy Code
        </button>
    );
}

// function OpponentChoiceButton({ opponentChoice, opponentButton }) {
function OpponentChoiceButton({ opponentChoice, opponentButton, setOpponentButton, setOpponentState }) {
    // setOpponentState(false)
    // setOpponentButton(true)
    return (
        <>
            {/* // className={opponentChoice.playerChoice.toString().toLowerCase()} */}
            {/* <button
                id="opponentButton"
                style={{ display: `${opponentButton ? "block" : "none"} ` }}
            >
                {opponentChoice.playerChoice}
            </button> */}

            <div className="weapons">
                {opponentChoice.playerChoice === "Rock" && <button id="opponentButton" className={opponentChoice.playerChoice} style={{ display: `${opponentButton ? "block" : "none"} ` }} ><i className="fa-solid fa-hand-back-fist"></i></button>}
                {opponentChoice.playerChoice === "Paper" && <button id="opponentButton" className={opponentChoice.playerChoice} style={{ display: `${opponentButton ? "block" : "none"} ` }} ><i className="fa-solid fa-hand"></i></button>}
                {opponentChoice.playerChoice === "Scissors" && <button id="opponentButton" className={opponentChoice.playerChoice} style={{ display: `${opponentButton ? "block" : "none"} ` }} ><i className="fa-solid fa-hand-scissors"></i></button>}
            </div>
            <p style={{ display: `${opponentButton ? "block" : "none"} ` }}> {opponentChoice.playerChoice}</p>
        </>
    );
}

function PlayerChoiceButton({ playerChoice }) {
    return (
        <>
            <div className="weapons">
                {playerChoice === "Rock" && <button className={playerChoice}><i className="fa-solid fa-hand-back-fist"></i></button>}
                {playerChoice === "Paper" && <button className={playerChoice}><i className="fa-solid fa-hand"></i></button>}
                {playerChoice === "Scissors" && <button className={playerChoice}><i className="fa-solid fa-hand-scissors"></i></button>}
            </div>
        </>
    );
}

function GameResult({ gameData, player1, setOpponentButton, setOpponentState }) {
    console.log("gameResult", gameData, player1)
    const [winnerText, setWinnerText] = useState('');

    useEffect(() => {
        if (gameData !== 'tie') {
            if (gameData === 'player1' && player1) {
                setWinnerText('You win!');
            } else if (gameData === 'player1') {
                setWinnerText('You lose.');
            } else if (gameData === 'player2' && !player1) {
                setWinnerText('You win!');
            } else if (gameData === 'player2') {
                setWinnerText('You lose.');
            }
        } else {
            setWinnerText('It\'s a draw!');
        }

        // setOpponentState(false)
        // setOpponentButton(true)
        // Consider using React state or refs for these elements instead
    }, [gameData, player1, setOpponentButton, setOpponentState]);

    // useEffect(() => {
    //     setOpponentState(false)
    //     setOpponentButton(true)
    // }, [gameData, setOpponentButton, setOpponentState])
    return (
        <div id="winnerArea">
            {winnerText && <p>{winnerText}</p>} {/* Conditionally render winner text */}
        </div>
    );
}

const PlayerLayout = () => {
    const [roomId, setRoomId] = useState('');
    const [isWaiting, setIsWaiting] = useState(false);
    const [viewGame, setViewGame] = useState(false);
    const [containerbox, setContainerbox] = useState(false)

    const [playerChoice, setPlayerChoice] = useState(null);

    const [opponentChoice, setOpponentChoice] = useState('');

    const [opponentState, setOpponentState] = useState(true);
    const [opponentButton, setOpponentButton] = useState(false);

    const [gameData, setGameData] = useState(null);

    const [player1, setPlayer1] = useState(false);
    const [winnerText, setWinnerText] = useState('');

    const choices = [
        { weapon: "Rock", icon: "fa-solid fa-hand-back-fist" },
        { weapon: "Paper", icon: "fa-solid fa-hand" },
        { weapon: "Scissors", icon: "fa-solid fa-hand-scissors" },
    ]

    console.log("roomId", roomId)
    console.log("isWaiting", isWaiting)
    console.log("viewGame", viewGame)
    console.log("containerbox", containerbox)
    console.log("opponentChoice", opponentChoice)
    console.log("playerChoice", playerChoice)
    console.log("gameData", gameData)
    console.log("player1", player1)
    console.log("opponentState", opponentState)
    console.log("opponentButton", opponentButton)

    const createOpponentChoiceButton = (data) => {
        console.log("createOpponentChoiceButton", data)
        setOpponentChoice(data); // Update state with opponent's choice
        setOpponentState(true)
        setOpponentButton(false)
    };

    const handleChoiceClick = (playerChoice) => {
        setPlayerChoice(playerChoice);
        const choiceEvent = player1 ? "player1Choice" : "player2Choice";
        socket.emit(choiceEvent, {
            playerChoice: playerChoice,
            roomId: roomId
        });
    };

    // create game
    const createGame = () => {
        // player1 = true;
        setPlayer1(true);
        socket.emit('createGame');
    }

    const joinGame = () => {
        setViewGame(true)
        console.log("join game", roomId)
        socket.emit('joinGame', { roomId: roomId });
    }

    socket.on('newGame', ({ roomId }) => {
        setRoomId(roomId);
        setViewGame(true)
        setIsWaiting(true)
    })

    socket.on("playersConnected", () => {
        setViewGame(true);
        setIsWaiting(false);
        setContainerbox(true)
    })

    socket.on("player1Choice", (data) => {
        if (!player1) {
            createOpponentChoiceButton(data);
        }
    });

    socket.on("player2Choice", (data) => {
        if (player1) {
            createOpponentChoiceButton(data);
        }
    });

    socket.on("result", (data) => {
        if (data.winner !== 'tie') {
            if (data.winner === 'player1' && player1) {
                setWinnerText('You win!');
            } else if (data.winner === 'player1') {
                setWinnerText('You lose.');
            } else if (data.winner === 'player2' && !player1) {
                setWinnerText('You win!');
            } else if (data.winner === 'player2') {
                setWinnerText('You lose.');
            }
        } else {
            setWinnerText('It\'s a draw!');
        }
        setOpponentState(false)
        setOpponentButton(true)

        // document.getElementById('opponentState').style.display = 'none';
        // document.getElementById('opponentButton').style.display = 'block';
        // document.getElementById('winnerArea').innerHTML = winnerText;
        setGameData(data.winner)
    });

    return (
        <>
            {viewGame ? (
                <div className="containers">
                    <header className="header">
                        <div className="title">
                            <p>Rock Paper scissors</p>
                        </div>
                        {/* <div className="scores">
                            <p>Opponent: <span id="computer-score">0</span>/6</p>
                            <p>You: <span id="user-score">0</span>/6</p>
                        </div> */}
                    </header>

                    <div id="waitingRoom" className="h4">
                        {isWaiting && (
                            <>
                                <p>Waiting for opponent, please share code {roomId} to join</p>
                                <CopyCodeButton roomId={roomId} />
                            </>
                        )}
                    </div>

                    <div className={`${containerbox ? "d-flex" : "d-none"}`}>
                        <div className="col-md-6">
                            You:
                            {playerChoice === null ? (
                                <div className="weapons">
                                    <button onClick={() => handleChoiceClick('Rock')}><i className="fa-solid fa-hand-back-fist"></i></button>
                                    <button onClick={() => handleChoiceClick('Paper')}><i className="fa-solid fa-hand"></i></button>
                                    <button onClick={() => handleChoiceClick('Scissors')}><i className="fa-solid fa-hand-scissors"></i></button>
                                </div>
                            ) : (
                                <div id="player1Choice">
                                    {playerChoice && <PlayerChoiceButton playerChoice={playerChoice} />}
                                    {playerChoice}
                                </div>
                            )}
                        </div>
                        <div className="col-md-6">
                            Opponent:
                            <div id="player2Choice">
                                {/* <div id="opponentState"
                                    style={{ display: `${opponentState ? "block" : "none"} ` }}
                                > */}
                                {opponentChoice !== ''
                                    ? <p style={{ display: `${opponentState ? "block" : "none"} ` }}>Opponent made a choice</p>
                                    : <p style={{ display: `${opponentState ? "block" : "none"} ` }}>Waiting for opponent's choice...</p>}
                                {/* </div> */}
                                <OpponentChoiceButton opponentChoice={opponentChoice} setOpponentButton={setOpponentButton} opponentButton={opponentButton} setOpponentState={setOpponentState} />
                            </div>
                        </div>
                    </div>
                    <hr />
                    {/* {gameData && <GameResult gameData={gameData} player1={player1} setOpponentButton={setOpponentButton} setOpponentState={setOpponentState} />} */}
                    {gameData ? (<div id="winnerArea">
                        {winnerText && <p>{winnerText}</p>}
                    </div>) : ""
                    }
                </div >
            ) : (
                <div className="containers">
                    <header className="header">
                        <div className="title">
                            <p>Rock Paper scissors</p>
                        </div>
                    </header>
                    <div id="initial" className="container col-md-6" >
                        <button className="form-control btn btn-primary" onClick={createGame}>Create Game</button>
                        <div className="text-center">or</div>
                        <input className="form-control my-2" placeholder="Enter Code" type="text" name="" value={roomId} onChange={(e) => setRoomId(e.target.value)} id="roomId" />
                        <button
                            className="form-control btn btn-secondary"
                            onClick={joinGame}
                            type="submit">Join Game
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default PlayerLayout