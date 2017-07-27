import React from 'react'
import { Button } from 'semantic-ui-react'

import MapContainer from './Container'

import '../index.css'

const io = require('socket.io-client')
let socket

class Dashboard extends React.Component {

  componentDidMount() {
    socket = io('/current-admin')
    socket.emit('new admin join')
  }

  nextSlide = () => {
    socket.emit('next slide', {})
    console.log('next slide')
  }

  pauseGame = () => {
    console.log('Game paused.')
  }

  render() {
    return (
      <div>
        <MapContainer />
        <Button
          color='facebook'
          basic={true}
          onClick={()=> {this.nextSlide()} }
        >
          Next Slide
        </Button>
        <Button
          color='facebook'
          basic={true}
          onClick={()=> {this.pauseGame()} }
        >
          Pause
        </Button>
      </div>
    )
  }
}

export default Dashboard
