const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gameSchema = new Schema({
  title: { type : String , required : true },
  description: { type: String, required: true },
  countryArray: { type: [], required: true },
  multiChoiceArray: { type: [[]], required: true },
  createdAt: { type: Date, default: Date.now }
})

let Game = module.exports = mongoose.model('Game', gameSchema)
