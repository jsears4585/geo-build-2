import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import HomePage from './pages/HomePage'
import JoinPage from './pages/JoinPage'
import CreatePage from './pages/CreatePage'

import NewGame from './containers/NewGame'

import GameContainer from './containers/GameContainer'
import PlayerContainer from './containers/PlayerContainer'
import SoloContainer from './containers/SoloContainer'

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
          <Route path='/solo' render={()=>(
            <SoloContainer
              currentGameTitle={this.state.currentGameTitle}
            />
          )}/>
          <Route path='/game' render={()=>(
            <GameContainer
              currentGameTitle={this.state.currentGameTitle}
              currentGameCode={this.state.currentGameCode}
            />
          )}/>
          <Route path='/new' component={NewGame} />
        </Switch>
      </div>
    )
  }

}

export default withRouter(App)
