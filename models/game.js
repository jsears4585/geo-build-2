const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gameSchema = new Schema({
  title: 'string',
  payload: Schema.Types.Mixed
})

let Game = module.exports = mongoose.model('Game', gameSchema)
