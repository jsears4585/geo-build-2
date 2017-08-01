import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Polygon } from 'google-maps-react'

import Borders from '../data/Borders'

const style = {
  width: '100%',
  height: '100%'
}

export class MapContainer extends Component {

  state = {
    currentSlide: 2,
    coords: [],
  }

  componentDidMount() {
    this.setState({
      coords: this.prettyCoords(Borders[this.state.currentSlide].data),
    })
  }

  prettyCoords = arr => {
    return arr.map(function(array) {
      return {lng: array[0], lat: array[1]}
    })
  }

  render() {
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
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDhs8heyr3zDwgAlQeOu6LiSSQ9m8V4xpA')
})(MapContainer)
