import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import JoinPage from './pages/JoinPage'
import CreatePage from './pages/CreatePage'

import MapContainer from './containers/MapContainer'
import PlayerContainer from './containers/PlayerContainer'

import './index.css'

// page was changed

class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/join' component={JoinPage}/>
          <Route path='/create' component={CreatePage} />
          <Route path='/player' render={(props)=>(
            <div>
              <PlayerContainer />
            </div>
          )}/>
          <Route path='/game' render={(props)=>(
            <MapContainer />
          )}/>
        </Switch>
      </div>
    )
  }

}

export default App
