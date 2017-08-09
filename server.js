// INIT
const express = require("express")
const app = express()
const http = require('http')
const bodyParser = require('body-parser')


// DATABASE
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')

const dbAuth = require('./config/dbAuth')
const uri = `mongodb://${dbAuth.user}:${dbAuth.pass}@geography-game-shard-00-00-qu8kc.mongodb.net:27017,geography-game-shard-00-01-qu8kc.mongodb.net:27017,geography-game-shard-00-02-qu8kc.mongodb.net:27017/prod?ssl=true&replicaSet=geography-game-shard-0&authSource=admin`

mongoose.connect(uri, { useMongoClient: true })
const db = mongoose.connection

const Game = require( "./models/game" )
const Country = require( "./models/country" )

db.on('error', console.error.bind(console, 'Connection error:'))
db.once('open', () => {
  console.log('DB Successfully Connected')
})


// SETTINGS
app.set("port", process.env.PORT || 3001)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
}

const server = app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`)
})


// ROUTES
app.post('/countries', (req, res) => {
  Country.find({ $or : req.body.query }, '-_id name borderData lat lng zoom', (err, countries) => {
    if (err) {
      console.log('Error occurred:', err)
      res.send('Error occurred.')
    } else {
      console.log('It worked, I think!')
      res.send(countries)
    }
  })
})


// SOCKETS
const socketIO = require('socket.io')

const io = require('socket.io')(server)
const currentPlayers = io.of('/current-players')
const currentAdmin = io.of('/current-admin')

let playersArray = []
let playersNameArray = []
let currentRound = -1
let answersArray = ['A', 'D', 'C', 'A', 'C', 'D']

currentPlayers.on('connection', (socket) => {
  socket.on('new user join', (data) => {
    console.log(`${data.name} has connected.`)

    playersArray.push({
      username: data.name,
      totalPoints: 0
    })
    playersNameArray.push(data.name)

    socket.emit('say hello', { name: data.name })
    currentAdmin.emit('new user joined', { playersNameArray: playersNameArray })
  })

  socket.on('send answer', (data) => {
    let index = playersArray.findIndex(el => (el.username === data.username))

    if ( answersArray[currentRound] === data.answer ) {
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

  socket.on('ask for scores', (data) => {
    socket.emit('received scores', {
      scores: playersArray
    })
  })

  socket.on('disconnect', () => {
    currentRound = -1
    playersArray = []
    playersNameArray = []

    console.log('Admin disconnected')
  })
})
