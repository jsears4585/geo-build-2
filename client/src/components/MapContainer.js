import React, { Component } from 'react'
import { Table, Button } from 'semantic-ui-react'
import { Map, GoogleApiWrapper, Polygon } from 'google-maps-react'

import Borders from '../data/Borders'
import Answers from '../data/Answers'

import AnswersContainer from './AnswersContainer'

import '../index.css'

const io = require('socket.io-client')
let socket

const style = {
  width: '100%',
  height: '100%'
}

export class MapContainer extends Component {
  state = {
    currentSlide: -1,
    coords: [],
    playersNameArray: [],
    playersScoreArray: [],
    answersArray: [],
    showMap: true,
  }

  componentDidMount() {
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
      coords: this.prettyCoords(Borders[newSlide].data),
      answersArray: Answers[newSlide],
    })
  }

  prettyCoords = arr => {
    return arr.map(function(array) {
      return {lng: array[0], lat: array[1]}
    })
  }

  renderMap = () => {
    return (
      <div>
        <AnswersContainer answersArray={this.state.answersArray} />
        <Map
          google={ this.props.google }
          style={ style }
          initialCenter={{
            lng: Borders[this.state.currentSlide].lng,
            lat: Borders[this.state.currentSlide].lat
          }}
          zoom={ Borders[this.state.currentSlide].zoom }
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
  }

  renderNames = () => {
    return (
      <div>
        <Table celled className="leaderboard">
          <Table.Header>
            <Table.HeaderCell className="playerColumn">Player</Table.HeaderCell>
            <Table.HeaderCell className="scoreColumn">Score</Table.HeaderCell>
          </Table.Header>
          <Table.Body>
            { this.state.playersNameArray.map(name => {
              return (
                <Table.Row>
                  <Table.Cell>{ name }</Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
              )
            }) }
          </Table.Body>
          <Table.Footer></Table.Footer>
        </Table>
        <div className="dashboardButtons">
          <Button
            color='facebook'
            basic={true}
            onClick={ ()=> { this.startGame() } }
          >
            Everybody Ready?
          </Button>
        </div>
      </div>
    )
  }

  renderScoreboard = () => {
    const sortedNames = this.state.playersScoreArray.sort(function(a, b) {
      return b.totalPoints - a.totalPoints
    })

    return (
      <div>
        <Table celled className="leaderboard">
          <Table.Header>
            <Table.HeaderCell className="playerColumn">Player</Table.HeaderCell>
            <Table.HeaderCell className="scoreColumn">Score</Table.HeaderCell>
          </Table.Header>
          <Table.Body>
            { sortedNames.map(player => {
              return (
                <Table.Row>
                  <Table.Cell>{ player.username }</Table.Cell>
                  <Table.Cell>{ player.totalPoints }</Table.Cell>
                </Table.Row>
              )
            }) }
          </Table.Body>
          <Table.Footer></Table.Footer>
        </Table>
        <div className="dashboardButtons">
          <Button
            color='facebook'
            basic={true}
            onClick={ ()=> { this.startGame() } }
          >
            Everybody Ready?
          </Button>
        </div>
      </div>
    )
  }

  render() {

    let toRender = null
    if ( this.state.currentSlide >= 0 && this.state.showMap ) {
      toRender = this.renderMap()
    } else if ( this.state.currentSlide >= 0 && !this.state.showMap ) {
      toRender = this.renderScoreboard()
    } else {
      toRender = this.renderNames()
    }

    return (
      <div>
        {toRender}
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDhs8heyr3zDwgAlQeOu6LiSSQ9m8V4xpA')
})(MapContainer)
