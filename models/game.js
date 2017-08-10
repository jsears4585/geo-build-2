const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gameSchema = new Schema({
  title: { type : String , required : true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  answers: { type: Schema.Types.Mixed, required: true }
})

let Game = module.exports = mongoose.model('Game', gameSchema)
