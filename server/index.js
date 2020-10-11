require('dotenv').config()
const express = require("express");
const http = require("http");

const socketIo = require("socket.io");
const SftpClient = require('./utils/sftpClient')

const index = require("./routes/index");


const event = new SftpClient()
const app = express();

app.use(index);

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

event.con.on("upload", function (data) {
  console.log(data)
  const updatedTournament = data.tournament.map((game, i) => ({
    ...game, pgns: game.pgns.map((pgn, x) => {
      return pgn.replace(data.tournament[i].pgns[x - 1], '').trim()
    })
  }))
  io.sockets.emit("get_data", updatedTournament)
});

event.con.on("error", function (data) {
	console.log(data.toString())
});

server.listen(process.env.PORT || 4003, () => console.log(`Listening on port ${process.env.PORT}`));