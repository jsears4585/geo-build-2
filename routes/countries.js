const Country = require( "../models/country" )

module.exports = function(app) {

  app.get('/get_country_names', (req, res) => {
    console.log('hit')
    Country.find({}, '-_id name', { sort: { 'name' : 1 }}, (err, countries) => {
      if (err) {
        console.log('Error occurred:', err)
        res.send('Error occurred.')
      } else {
        let returnArray = countries.map(country=>country.name)
        console.log(returnArray)
        res.send(returnArray)
      }
    })
  })

  app.post('/create_country', (req, res) => {
    let country = new Country(req.body.country)
    country.save((err, country, numAffected) => {
      if (err) {
        console.log('Error occurred:', err)
        res.send('Error occurred.')
      } else {
        res.send(country)
      }
    })
  })

  app.post('/create_countries', (req, res) => {
    let countriesAsObjects = req.body.countries.map(country => {
      return new Country(country)
    })
    countriesAsObjects.forEach(country => {
      country.save((err, country, numAffected) => {
        if (err) {
          console.log('Error occurred:', err)
          res.send('Error occurred.')
        } else {
          console.log('worked')
        }
      })
    })

  })

  app.post('/retrieve_countries', (req, res) => {
    Country.find({ $or : req.body.query }, '-_id name borderData lat lng zoom', (err, countries) => {
      if (err) {
        console.log('Error occurred:', err)
        res.send('Error occurred.')
      } else {
        res.send(countries)
      }
    })
  })

}
