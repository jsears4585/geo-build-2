import React, { Component } from 'react'

import Names from '../components/Names'
import Scoreboard from '../components/Scoreboard'
import FinalScoreboard from '../components/FinalScoreboard'
import CurrentMap from '../components/CurrentMap'

import * as utils from '../lib/utils.js'
import * as mapHelpers from '../lib/mapContainerHelpers.js'
import '../index.css'

const io = require('socket.io-client')
let socket

export class GameContainer extends Component {

  state = {
    coords: [],
    currentSlide: -1,
    lastSlideIndex: null,
    importedCountries: [],
    importedAnswers: null,
    currentLat: null,
    currentLng: null,
    currentZoom: null,
    playersNameArray: [],
    playersScoreArray: [],
    answersArray: [],
    shuffledAnswersArray: [],
    multiAnswersArray: [],
    mapDisplayOrder: [],
    time: 10,
    showMap: true
  }

  timeKeeping = seconds => {
    let time = setInterval(() => {
      if (this.state.time <= 0) {
        clearInterval(time)
        this.setState({
          time: seconds
        })
      } else {
        this.setState({ time: this.state.time - 1 })
      }
    }, seconds * 100)
  }

  componentDidMount() {
    let useThis = this.props.currentGameTitle || "It's Croatia"
    this.initialEmit()
    fetch('/retrieve_game_by_id', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ "game": { "title": useThis } })
    })
      .then(res => res.json())
      .then(response => this.setState({ importedAnswers: response }))
      .then(response => this.formatAnswers(response))
  }

  retrieveCountries = countriesToRequest => {
    fetch('/retrieve_countries', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(countriesToRequest)
    })
      .then(res => res.json())
      .then(res => {
        let ordered = mapHelpers.orderCountries(this.state.mapDisplayOrder, res)
        this.setState({ importedCountries: ordered })
      })
  }

  initialEmit = () => {
    socket = io('/current-admin')
    socket.emit('new admin join')
    socket.on('new user joined', (data) => {
      this.setState({ playersNameArray: data.playersNameArray })
    })
    socket.on('received scores', (data) => {
      this.setState({ playersScoreArray: data.scores })
    })
  }

  createMultipleChoice = (shuffled, firsts) => {
    let multiAnswers = mapHelpers.generateMultiChoice(shuffled, firsts)
    socket.emit('send multi answers', { multiAnswers: multiAnswers })
    this.setState({ multiAnswersArray: multiAnswers })
  }

  formatAnswers = () => {
    let firsts = this.state.importedAnswers.answers.map(answerArr => {
      return answerArr[0]
    })
    let shuffled = this.state.importedAnswers.answers.map(answerArr => {
      return utils.shuffleArray(answerArr)
    })
    this.createMultipleChoice(shuffled, firsts)
    this.setState({
      mapDisplayOrder: firsts,
      lastSlideIndex: firsts.length - 1,
      shuffledAnswersArray: shuffled
    })
    let formatted = firsts.map(country => {
      return { "name" : country }
    })
    let countriesToRequest = { "query" : formatted }
    this.retrieveCountries(countriesToRequest)
  }

  askForScores = () => {
    socket.emit('ask for scores')
    this.setState({ showMap: false })
  }

  startGame = () => {
    this.setState({ showMap: true })
    this.nextSlide()
    this.timeKeeping(10)
    setTimeout(this.askForScores, 11337)
  }

  nextSlide = () => {
    socket.emit('next slide', {})
    let newSlide = this.state.currentSlide + 1
    socket.emit('new answers', { answers: this.state.shuffledAnswersArray[newSlide] })
    this.setState({
      currentSlide: newSlide,
      coords: this.state.importedCountries[newSlide].borderData,
      answersArray: this.state.shuffledAnswersArray[newSlide],
      currentLat: this.state.importedCountries[newSlide].latitude,
      currentLng: this.state.importedCountries[newSlide].longitude,
      currentZoom: this.state.importedCountries[newSlide].zoom,
    })
  }

  render() {
    if ( this.state.currentSlide >= 0 && this.state.showMap ) {
      return (
        <CurrentMap
          time={ this.state.time }
          answersArray={ this.state.answersArray }
          currentLng={ this.state.currentLng }
          currentLat={ this.state.currentLat }
          currentZoom={ this.state.currentZoom }
          coords={ this.state.coords }
        />
      )
    } else if ( this.state.currentSlide >= this.state.lastSlideIndex
                && !this.state.showMap) {

      let sorted = this.state.playersScoreArray.sort((a, b)=>{
        return b.totalPoints - a.totalPoints
      })
      let winnerArray = sorted.slice(0, 3)

      return (
        <FinalScoreboard
          playersScoreArray={ this.state.playersScoreArray }
          winnerArray={ winnerArray }
        />
      )
    } else if ( this.state.currentSlide >= 0 && !this.state.showMap ) {
      return (
        <Scoreboard
          playersScoreArray={ this.state.playersScoreArray }
          startGame={ this.startGame }
        />
      )
    } else {
      return (
        <Names
          playersNameArray={ this.state.playersNameArray }
          gameCode={ this.props.currentGameCode }
          startGame={ this.startGame }
          countriesLength={ this.state.importedCountries.length }
          answersLength={ this.state.multiAnswersArray.length }
        />
      )
    }
  }
}

export default GameContainer
