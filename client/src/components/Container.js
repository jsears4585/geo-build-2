import React, { Component } from 'react'

import { Map, GoogleApiWrapper, Polygon } from 'google-maps-react'

export class MapContainer extends Component {
  render() {
    var triangleCoords = [
      {lat: 25.774, lng: -80.190},
      {lat: 18.466, lng: -66.118},
      {lat: 32.321, lng: -64.757},
      {lat: 25.774, lng: -80.190}
    ]
    return (
      <Map google={this.props.google}
          initialCenter={{
            lat: 40.685002,
            lng: -73.979997
          }}
          zoom={15}
          disableDefaultUI={true}
          draggable={false}
      >
      <Polygon
          paths={triangleCoords}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor="#0000FF"
          fillOpacity={0.35}
      />
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDhs8heyr3zDwgAlQeOu6LiSSQ9m8V4xpA')
})(MapContainer)
