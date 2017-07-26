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

const currentPlayers = io.of('/current-players')
const currentAdmin = io.of('/current-admin')

currentPlayers.on('connection', (socket) => {
  console.log('User connected')

  socket.on('new user join', (data) => {
    console.log(`${data.name} has joined the game.`)
    socket.emit('say hello', { name: data.name })
  })

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
})

currentAdmin.on('connection', (socket) => {
  socket.on('new admin join', (data) => {
    console.log(`Admin connected.`)
  })

  socket.on('next slide', (data) => {
    currentPlayers.emit('say works', { works: true })
  })

  socket.on('disconnect', () => {
    console.log('Admin disconnected')
  })
})
