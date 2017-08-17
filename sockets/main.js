module.exports = function(io) {

  const currentPlayers = io.of('/current-players')
  const currentAdmin = io.of('/current-admin')

  let playersArray = []
  let playersNameArray = []
  let currentRound = -1
  let answersArray = []
  let countriesArray = []

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

      socket.emit('receive round data', {
        correctAnswer: answersArray[currentRound],
        answersArray: countriesArray
      })

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

    socket.on('send multi answers', (data) => {
      answersArray = data.multiAnswers
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

}
