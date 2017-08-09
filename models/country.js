const mongoose = require('mongoose')
const Schema = mongoose.Schema

const countrySchema = new Schema({
  name: { type : String , unique : true, required : true, dropDups: true },
  borderData: { type: [], required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  zoom: { type: Number, required: true }
})

let Country = module.exports = mongoose.model('Country', countrySchema)
