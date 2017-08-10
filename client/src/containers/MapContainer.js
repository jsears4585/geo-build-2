import React, { Component } from 'react'
import { Table, Button } from 'semantic-ui-react'
import { Map, GoogleApiWrapper, Polygon } from 'google-maps-react'

import Answers from '../components/Answers'

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

  shuffleArray = a => {
    for (let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a
  }

  formatAnswers = () => {
    let firsts = this.state.importedAnswers.answers.map(answerArr => {
      return answerArr[0]
    })
    let shuffled = this.state.importedAnswers.answers.map(answerArr => {
      return this.shuffleArray(answerArr)
    })
    let multiAnswers = shuffled.map((shuffledArr, index) => {
      let shuffledIndex = shuffledArr.indexOf(firsts[index])
      switch (shuffledIndex) {
        case 0:
          return 'A'
        case 1:
          return 'B'
        case 2:
          return 'C'
        case 3:
          return 'D'
        default:
          return 'Error occurred.'
      }
    })
    socket.emit('send multi answers', { multiAnswers: multiAnswers })
    this.setState({
      mapDisplayOrder: firsts,
      shuffledAnswersArray: shuffled,
      multiAnswersArray: multiAnswers,
    })
    let formatted = firsts.map(country => {
      return { "name" : country }
    })
    let countriesToRequest = {
      "query" : formatted
    }
    this.retrieveCountries(countriesToRequest)
  }

  orderCountries = asyncCountries => {
    let order = this.state.mapDisplayOrder
    console.log('Ordered:', order)
    let newOrder = order.map(ordered => {
      return asyncCountries.filter(country => country.name === ordered)
    })
    let flattened = newOrder.reduce((a, b) => {
      return a.concat(b)
    }, [])
    return flattened
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
        let ordered = this.orderCountries(response)
        this.setState({ importedCountries: ordered })
      })
  }

  componentDidMount() {

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
      coords: this.prettyCoords(this.state.importedCountries[newSlide].borderData),
      answersArray: this.state.shuffledAnswersArray[newSlide],
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
        <Answers answersArray={this.state.answersArray} />
        <Map
          google={ this.props.google }
          style={ style }
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
