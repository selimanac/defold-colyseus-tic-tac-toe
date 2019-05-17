const http = require('http');
const express = require('express');
const colyseus = require('colyseus');
const monitor = require("@colyseus/monitor").monitor;


const TicTacToe = require('./rooms/tictactoe').TicTacToe;
colyseus.serialize(colyseus.FossilDeltaSerializer)(TicTacToe);

const port = process.env.PORT || 3553;
const app = express()

const server = http.createServer(app);
const gameServer = new colyseus.Server({ server });

// register your room handlers
gameServer.register('tictactoe', TicTacToe);

// Register colyseus monitor AFTER registering your room handlers
app.use("/ws", monitor(gameServer));

gameServer.listen(port);
console.log(`Listening on ws://localhost:${ port }`)
