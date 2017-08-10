const express = require("express")
const app = express()
const http = require('http')
const bodyParser = require('body-parser')

// Database
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')

const dbAuth = require('./config/dbAuth')
const uri = `mongodb://${dbAuth.user}:${dbAuth.pass}@geography-game-shard-00-00-qu8kc.mongodb.net:27017,geography-game-shard-00-01-qu8kc.mongodb.net:27017,geography-game-shard-00-02-qu8kc.mongodb.net:27017/prod?ssl=true&replicaSet=geography-game-shard-0&authSource=admin`

mongoose.connect(uri, { useMongoClient: true })
const db = mongoose.connection

db.on('error', console.error.bind(console, 'Connection error:'))
db.once('open', () => {
  console.log('DB Successfully Connected')
})

// Settings
app.set("port", process.env.PORT || 3001)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
}
const server = app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`)
})

// Routes
require('./routes/countries')(app)
require('./routes/games')(app)

// SOCKETS
const socketIO = require('socket.io')
const io = require('socket.io')(server)
require('./sockets/main')(io)
