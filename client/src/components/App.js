import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import Join from './Join'
import Create from './Create'
import PlayerConnection from './PlayerConnection'
import PlayerController from './PlayerController'
import MapContainer from './MapContainer'

import '../index.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/join' component={Join}/>
          <Route path='/create' component={Create} />
          <Route path='/game' render={(props)=>(
            <div>
              <PlayerController />
              <PlayerConnection />
            </div>
          )}/>
          <Route path='/dashboard' component={MapContainer}/>
        </Switch>
      </div>
    )
  }
}

export default App
