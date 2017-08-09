const mongoose = require('mongoose')
const Schema = mongoose.Schema

const countrySchema = new Schema({
  name: String,
  borderData: [],
  lat: Number,
  lng: Number,
  zoom: Number
})

let Country = module.exports = mongoose.model('Country', countrySchema)
