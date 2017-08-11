import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import JoinPage from './pages/JoinPage'
import CreatePage from './pages/CreatePage'

import GameContainer from './containers/GameContainer'
import PlayerContainer from './containers/PlayerContainer'

import './index.css'

class App extends Component {

  state = {
    currentGameTitle: null,
    currentGameCode: null
  }

  updateGameTitle = title => {
    this.setState({
      currentGameTitle: title
    })
  }

  updateGameCode = code => {
    this.setState({
      currentGameCode: code
    })
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/join' component={JoinPage}/>
          <Route path='/create' render={()=>(
            <CreatePage
              updateGameTitle={this.updateGameTitle}
              updateGameCode={this.updateGameCode}
            />
          )}/>
          <Route path='/player' render={()=>(
            <PlayerContainer />
          )}/>
          <Route path='/game' render={()=>(
            <GameContainer
              currentGameTitle={this.state.currentGameTitle}
              currentGameCode={this.state.currentGameCode}
            />
          )}/>
        </Switch>
      </div>
    )
  }

}

export default App
