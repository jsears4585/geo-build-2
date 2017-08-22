import React from 'react'
import ReactMapboxGl, { Layer, Feature, ZoomControl } from 'react-mapbox-gl'

import Answers from './Answers'
import mapBoxAuth from '../config/mapboxAuth'
import '../index.css'

const Map = ReactMapboxGl({ accessToken: mapBoxAuth.pass })
const multiPolygonPaint = { 'fill-color': '#FF0' }

const CurrentMap = ({
  time,
  answersArray,
  currentLng,
  currentLat,
  currentZoom,
  coords
}) => {
  return (
    <div>
      <div className="timecard">
        <div className="timecardInside">
          { time === 10 ? null : time }
        </div>
      </div>
      <Answers answersArray={ answersArray } />
      <Map
        // eslint-disable-next-line
        style={ 'mapbox://styles/jsears5/cj674mwhz04k72soxxht9ghgq' }
        center={ [ currentLng, currentLat ] }
        containerStyle={{
          height: "100vh",
          width: "100vw",
          position: "relative",
          zIndex: "1"
        }}
        zoom={ [currentZoom] }
      >
      <ZoomControl/>
      <Layer
        type="fill"
        paint={ multiPolygonPaint }
      >
      <Feature coordinates={ coords } />
      </Layer>
      </Map>
    </div>
  )
}

export default CurrentMap
