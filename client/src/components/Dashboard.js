import React from 'react'
import { Button } from 'semantic-ui-react'

import '../index.css'

class Dashboard extends React.Component {

  nextSlide = () => {
    fetch('http://api.icndb.com/jokes/random')
      .then(res => res.json())
      .then(res => console.log(res))
  }

  pauseGame = () => {
    console.log('Game paused.')
  }

  render() {
    return (
      <div className='wrapper'>
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
