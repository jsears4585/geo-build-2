import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Polygon } from 'google-maps-react'

import Answers from '../components/Answers'
import Names from '../components/Names'
import Scoreboard from '../components/Scoreboard'
import FinalScoreboard from '../components/FinalScoreboard'

import * as utils from '../lib/utils.js';
import * as mapHelpers from '../lib/mapContainerHelpers.js';
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
    playersNameArray: [],
    playersScoreArray: [],
    answersArray: [],
    shuffledAnswersArray: [],
    multiAnswersArray: [],
    mapDisplayOrder: [],
    showMap: true,
  }

  componentDidMount() {
    this.initialEmit()
    fetch('http://localhost:3000/retrieve_game_by_id', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({"game": { "title": "Sixth game ever." } })
    })
      .then(res => res.json())
      .then(response => this.setState({ importedAnswers: response }))
      .then(response => this.formatAnswers(response))
  }

  retrieveCountries = countriesToRequest => {
    fetch('http://localhost:3000/retrieve_countries', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(countriesToRequest)
    })
      .then(res => res.json())
      .then(response => {
        let ordered = mapHelpers.orderCountries(this.state.mapDisplayOrder, response)
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
      console.log(data)
      this.setState({ playersScoreArray: data.scores })
    })
  }

  createMultipleChoice = (shuffled, firsts) => {
    let multiAnswers = mapHelpers.generateMultiChoice(shuffled, firsts)
    socket.emit('send multi answers', { multiAnswers: multiAnswers })
    this.setState({ multiAnswersArray: multiAnswers })
  }

  formatAnswers = () => {
    let firsts = this.state.importedAnswers.answers.map(answerArr => answerArr[0])
    let shuffled = this.state.importedAnswers.answers.map(answerArr => utils.shuffleArray(answerArr))
    console.log(shuffled)
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
      coords: mapHelpers.prettyCoords(this.state.importedCountries[newSlide].borderData),
      answersArray: this.state.shuffledAnswersArray[newSlide],
    })
  }

  render() {
    if ( this.state.currentSlide >= 0 && this.state.showMap ) {
      return (
        <div>
          <Answers answersArray={this.state.answersArray} />
          <Map
            google={ this.props.google }
            style={ { width: '100%', height: '100%' } }
            initialCenter={{
              lng: this.state.importedCountries[this.state.currentSlide].lng,
              lat: this.state.importedCountries[this.state.currentSlide].lat
            }}
            zoom={ this.state.importedCountries[this.state.currentSlide].zoom }
            mapType='satellite'
            key={ this.state.currentSlide }
          >
          <Polygon
            paths={ this.state.coords }
            strokeColor="#ffff00"
            strokeOpacity={0.8}
            strokeWeight={2}
            fillColor="#ffff00"
            fillOpacity={0.15}
          />
          </Map>
        </div>
      )
    } else if ( this.state.currentSlide >= this.state.lastSlideIndex && !this.state.showMap) {
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
          startGame={this.startGame}
        />
      )
    }
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDhs8heyr3zDwgAlQeOu6LiSSQ9m8V4xpA')
})(GameContainer)
