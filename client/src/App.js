import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import JoinPage from './pages/JoinPage'
import CreatePage from './pages/CreatePage'

import NewGame from './containers/NewGame'

import GameContainer from './containers/GameContainer'
import PlayerContainer from './containers/PlayerContainer'

import './index.css'

class App extends Component {

  state = {
    currentGameTitle: null,
    currentGameCode: null,
    currentCountries: []
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

  setCurrentCountries = array => {
    console.log(array)
    this.setState({
      currentCountries: array
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
            <PlayerContainer
              currentCountries={this.state.currentCountries}
            />
          )}/>
          <Route path='/game' render={()=>(
            <GameContainer
              currentGameTitle={this.state.currentGameTitle}
              currentGameCode={this.state.currentGameCode}
              setCurrentCountries={this.setCurrentCountries}
            />
          )}/>
          <Route path='/new' component={NewGame} />
        </Switch>
      </div>
    )
  }

}

export default App
