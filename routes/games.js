const Game = require( "../models/game" )

module.exports = function(app) {

  app.get('/games', (req, res) => {
    Game.find({}, {}, { sort: { 'createdAt' : -1 }, limit: 8 }, (err, games) => {
      if (err) {
        console.log('Error occurred:', err)
        res.send('Error occurred.')
      } else {
        res.send(games)
      }
    })
  })

  app.post('/retrieve_game_by_id', (req, res) => {
    Game.findOne(req.body.game, {}, (err, game) => {
      if (err) {
        console.log('Error occurred:', err)
        res.send('Error occurred.')
      } else {
        res.send(game)
      }
    })
  })

  app.post('/game', (req, res) => {
    let game = new Game(req.body.game)

    game.save((err, game, numAffected) => {
      if (err) {
        console.log('Error occurred:', err)
        res.send('Error occurred.')
      } else {
        res.send(game)
      }
    })
  })

}
