import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import Join from './Join'
import Create from './Create'
import Dashboard from './Dashboard'
import MapContainer from './MapContainer'
import Player from './Player'

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
              <Player />
            </div>
          )}/>
          <Route path='/dashboard' render={(props)=>(
            <div>
              <MapContainer />
              <Dashboard className="db" />
            </div>
          )}/>
        </Switch>
      </div>
    )
  }
}

export default App
