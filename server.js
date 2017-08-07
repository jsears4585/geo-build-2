const express = require("express")
const app = express()
const http = require('http')
const socketIO = require('socket.io')

// Nothing changed

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

let playersArray = []
let currentRound = 0
let answersArray = ['A', 'D', 'C', 'A']

currentPlayers.on('connection', (socket) => {
  socket.on('new user join', (data) => {
    console.log(`${data.name} has connected.`)

    playersArray.push({
      username: data.name,
      totalPoints: 0
    })
    socket.emit('say hello', { name: data.name })
  })

  socket.on('send answer', (data) => {
    console.log(`${data.username}'s answer was ${data.answer} with ${data.points} points!`)

    let index = playersArray.findIndex(function(el) {
      return el.username === data.username
    })
    if ( answersArray[currentRound - 1] === data.answer ) {
      playersArray[index][`round_${currentRound}`] = data.points
      playersArray[index]['totalPoints'] += data.points 
    } else {
      playersArray[index][`round_${currentRound}`] = 0
    }

    console.log(playersArray)
  })

  socket.on('disconnect', () => {
    console.log('A user has disconnected')
  })
})

currentAdmin.on('connection', (socket) => {
  socket.on('new admin join', (data) => {
    console.log(`Admin has connected.`)
  })

  socket.on('next slide', (data) => {
    currentPlayers.emit('render controller', { render: true })
    currentRound++
  })

  socket.on('disconnect', () => {
    currentRound = 0
    console.log('Admin disconnected')
  })
})
