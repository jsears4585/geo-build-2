const express = require("express")
const app = express()
const http = require('http')
const socketIO = require('socket.io')

app.set("port", process.env.PORT || 3001)

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
}

const server = app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`)
})

const io = require('socket.io')(server)

const gameRoomSettings = {
  users: []
}

io.on('connection', (socket) => {
  console.log('a user connected')
  console.log(gameRoomSettings.users)

  gameRoomSettings.users.push({
    username: 'ralphie',
    socketID: socket.id
  })

  // send message to just one socket
  io.to(gameRoomSettings.users[0].socketID).emit('message', 'just for my first one.')

  socket.on('new user join', (data) => {
    console.log(`${data.name} has joined the game.`)
    io.sockets.emit('say hello', { name: data.name })
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})
