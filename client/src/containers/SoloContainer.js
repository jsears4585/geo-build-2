import React, { Component } from 'react'
import { Button, Loader } from 'semantic-ui-react'
import ReactMapboxGl, { Layer, Feature, ZoomControl } from 'react-mapbox-gl'

import SoloAnswers from '../components/SoloAnswers'

import mapBoxAuth from '../config/mapboxAuth'
import * as utils from '../lib/utils.js'
import * as mapHelpers from '../lib/mapContainerHelpers.js'
import '../index.css'

const Map = ReactMapboxGl({ accessToken: mapBoxAuth.pass })

const multiPolygonPaint = { 'fill-color': '#FF0' }

export class SoloContainer extends Component {

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
    showMap: true,
    gameOver: false,
    runningTotal: 0,
    disableButtons: false
  }

  timeKeeping = seconds => {
    let time = setInterval(() => {
      if (this.state.time <= 0) {
        clearInterval(time)
        if (this.state.lastSlideIndex === this.state.currentSlide) {
          this.setState({ gameOver: true })
        } else {
          this.setState({ time: seconds })
          this.nextSlide()
        }
      } else {
        this.setState({ time: this.state.time - 1 })
      }
    }, seconds * 100)
  }

  componentDidMount() {
    let useThis = this.props.currentGameTitle || "Learn the countries of Southeast Asia"
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

  createMultipleChoice = (shuffled, firsts) => {
    let multiAnswers = mapHelpers.generateMultiChoice(shuffled, firsts)
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

  recordAnswer = answer => {
    if (!this.state.disableButtons) {
      if (this.state.multiAnswersArray[this.state.currentSlide] === answer) {
        this.setState({
          runningTotal: this.state.runningTotal + 1,
          disableButtons: true
        })
      } else {
        this.setState({
          disableButtons: true
        })
      }
    }
  }

  nextSlide = () => {
    let newSlide = this.state.currentSlide + 1
    this.setState({
      disableButtons: false,
      currentSlide: newSlide,
      coords: this.state.importedCountries[newSlide].borderData,
      answersArray: this.state.shuffledAnswersArray[newSlide],
      currentLat: this.state.importedCountries[newSlide].latitude,
      currentLng: this.state.importedCountries[newSlide].longitude,
      currentZoom: this.state.importedCountries[newSlide].zoom,
    })
    this.timeKeeping(10)
  }

  render() {
    if ( this.state.gameOver ) {
      return (
        <div>You got {this.state.runningTotal} out of {this.state.lastSlideIndex + 1} correct! </div>
      )
    }
    if ( this.state.currentSlide >= 0 ) {
      return (
        <div>
          <div className="timecard">
            <div className="timecardInside">{this.state.time === 10 ? null : this.state.time}</div>
          </div>
          <SoloAnswers
            answersArray={this.state.answersArray}
            recordAnswer={this.recordAnswer}
            disableButtons={this.state.disableButtons}
          />
          <Map
            // eslint-disable-next-line
            style={'mapbox://styles/jsears5/cj674mwhz04k72soxxht9ghgq'}
            center={[ this.state.currentLng, this.state.currentLat ]}
            containerStyle={{
              height: "100vh",
              width: "100vw",
              position: "relative",
              zIndex: "1"
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
    } else {
      if (this.state.importedCountries) {
        return (
          <Button
            onClick={()=>this.nextSlide()}
          >
            Ready?
          </Button>
        )
      } else {
        return (
          <Loader active inline='centered' />
        )
      }
    }
  }
}

export default SoloContainer
