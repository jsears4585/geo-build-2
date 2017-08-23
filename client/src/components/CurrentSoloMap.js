import React from 'react'
import ReactMapboxGl, { Layer, Feature, ZoomControl } from 'react-mapbox-gl'

import SoloAnswers from '../components/SoloAnswers'
import mapBoxAuth from '../config/mapboxAuth'
import '../index.css'

const Map = ReactMapboxGl({ accessToken: mapBoxAuth.pass })
const multiPolygonPaint = { 'fill-color': '#FF0' }

const CurrentSoloMap = ({
  time,
  successMessage,
  answersArray,
  recordAnswer,
  disableButtons,
  currentLng,
  currentLat,
  currentZoom,
  coords
}) => {
  return (
    <div className="soloPlayerMap">
      <div className="timecard">
        <h2>
          { time === 10 ? null : time }
        </h2>
      </div>
      <div className="successFlash">
        <h2>
          { successMessage }
        </h2>
      </div>
      <SoloAnswers
        answersArray={ answersArray }
        recordAnswer={ recordAnswer }
        disableButtons={ disableButtons }
      />
      <Map
        // eslint-disable-next-line
        style={ 'mapbox://styles/jsears5/cj674mwhz04k72soxxht9ghgq' }
        center={ [currentLng, currentLat] }
        containerStyle={ {
          height: "100vh",
          width: "100vw",
          position: "relative",
          zIndex: "1"
        } }
        zoom={ [currentZoom] }
      >
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

export default CurrentSoloMap
