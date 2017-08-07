import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Map, GoogleApiWrapper, Polygon } from 'google-maps-react'

import Borders from '../data/Borders'

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
    map: null,
    playersNameArray: []
  }

  componentDidMount() {
    socket = io('/current-admin')
    socket.emit('new admin join')
    socket.on('new user joined', (data) => {
      this.setState({ playersNameArray: data.playersNameArray })
    })
  }

  nextSlide = () => {
    socket.emit('next slide', {})
    let newSlide = this.state.currentSlide + 1
    this.setState({
      currentSlide: newSlide,
      coords: this.prettyCoords(Borders[newSlide].data)
    })
    console.log('next slide')
  }

  pauseGame = () => {
    console.log('Game paused.')
  }

  prettyCoords = arr => {
    return arr.map(function(array) {
      return {lng: array[0], lat: array[1]}
    })
  }

  renderMap = () => {
    return (
      <Map
        google={this.props.google}
        style={style}
        initialCenter={{
          lng: Borders[this.state.currentSlide].lng,
          lat: Borders[this.state.currentSlide].lat
        }}
        zoom={Borders[this.state.currentSlide].zoom}
        mapType='satellite'
        key={this.state.currentSlide}
      >
      <Polygon
        paths={this.state.coords}
        strokeColor="#ffff00"
        strokeOpacity={0.8}
        strokeWeight={2}
        fillColor="#ffff00"
        fillOpacity={0.15}
      />
      </Map>
    )
  }

  renderNames = () => {
    return (
      this.state.playersNameArray.map(name => {
        return <li>{name}</li>
      })
    )
  }

  render() {
    let toRender = null

    if (this.state.currentSlide >= 0) {
      toRender = this.renderMap()
    } else {
      toRender = this.renderNames()
    }

    return (
      <div>
        {toRender}
        <div className="dashboardButtons">
          <Button
            color='facebook'
            basic={true}
            onClick={ ()=> {this.nextSlide()} }
          >
            Next Slide
          </Button>
          <Button
            color='facebook'
            basic={true}
            onClick={ ()=> {this.pauseGame()} }
          >
            Pause
          </Button>
        </div>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDhs8heyr3zDwgAlQeOu6LiSSQ9m8V4xpA')
})(MapContainer)
