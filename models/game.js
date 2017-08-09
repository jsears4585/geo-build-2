const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gameSchema = new Schema({
  title: String,
  description: String,
  countryArray: [],
  multiChoiceArray: [],
  answerArray: []
})

let Game = module.exports = mongoose.model('Game', gameSchema)
