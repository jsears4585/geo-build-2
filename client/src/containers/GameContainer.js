import React, { Component } from 'react'
import ReactMapboxGl, { Layer, Feature, ZoomControl } from 'react-mapbox-gl'

import Answers from '../components/Answers'
import Names from '../components/Names'
import Scoreboard from '../components/Scoreboard'
import FinalScoreboard from '../components/FinalScoreboard'

import mapBoxAuth from '../config/mapboxAuth'
import * as utils from '../lib/utils.js'
import * as mapHelpers from '../lib/mapContainerHelpers.js'
import '../index.css'

const io = require('socket.io-client')
let socket

const Map = ReactMapboxGl({ accessToken: mapBoxAuth.pass })

const multiPolygonPaint = { 'fill-color': '#FFFF00' }

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
    showMap: true,
  }

  componentDidMount() {
    let useThis = this.props.currentGameTitle || "Learn the countries of Southeast Asia"
    this.initialEmit()
    fetch('/retrieve_game_by_id', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({"game": { "title": useThis } })
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
    let countriesToRequest = {
      "query" : formatted
    }
    this.retrieveCountries(countriesToRequest)
  }

  askForScores = () => {
    socket.emit('ask for scores')
    this.setState({ showMap: false })
  }

  startGame = () => {
    this.setState({ showMap: true })
    this.nextSlide()
    setTimeout(this.askForScores, 11337)
  }

  nextSlide = () => {
    socket.emit('next slide', {})
    let newSlide = this.state.currentSlide + 1
    this.setState({
      currentSlide: newSlide,
      coords: this.state.importedCountries[newSlide].borderData,
      answersArray: this.state.shuffledAnswersArray[newSlide],
      currentLat: this.state.importedCountries[newSlide].lat,
      currentLng: this.state.importedCountries[newSlide].lng,
      currentZoom: this.state.importedCountries[newSlide].zoom,
    })
  }

  render() {
    if ( this.state.currentSlide >= 0 && this.state.showMap ) {
      return (
        <div>
          <Answers answersArray={this.state.answersArray} />
          <Map
            // eslint-disable-next-line
            style={'mapbox://styles/jsears5/cj674mwhz04k72soxxht9ghgq'}
            center={[ this.state.currentLat, this.state.currentLng ]}
            containerStyle={{
              height: "100vh",
              width: "100vw"
            }}
            zoom={[this.state.currentZoom]}
          >
          <ZoomControl/>
          <Layer
            type="fill"
            paint={multiPolygonPaint}
          >
          <Feature coordinates={this.state.coords} />
          </Layer>
          </Map>
        </div>
      )
    } else if ( this.state.currentSlide >= this.state.lastSlideIndex
                && !this.state.showMap) {
      return (
        <FinalScoreboard
          playersScoreArray={this.state.playersScoreArray}
          startGame={this.startGame}
        />
      )
    } else if ( this.state.currentSlide >= 0 && !this.state.showMap ) {
      return (
        <Scoreboard
          playersScoreArray={this.state.playersScoreArray}
          startGame={this.startGame}
        />
      )
    } else {
      return (
        <Names
          playersNameArray={this.state.playersNameArray}
          gameCode={this.props.currentGameCode}
          startGame={this.startGame}
        />
      )
    }
  }
}

export default GameContainer
