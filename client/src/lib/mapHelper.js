function initMap() {

    const zoomSize = l => {
      switch(true) {
        case l < 10:
          return '7';
          break;
        case l < 69:
          return '6';
          break;
        case l < 130:
          return '5';
          break;
        default:
          return '4';
      }
    }

    const reduceLng = arr => {
      return arr.reduce(function(a, b) {
        return a + b[0]
      }, 0)
    }

    const reduceLat = arr => {
      return arr.reduce(function(a, b) {
        return a + b[1]
      }, 0)
    }

    let longestArrayIndex = 0
    let longestArray = 0

    const findLongestArr = arr => {
      return arr.forEach(function(el, index) {
        if (el.length > longestArray) {
          longestArray = el.length
          longestArrayIndex = index
        }
      })
    }

    const prettyCoords = arr => {
      return arr.map(function(array) {
        return {lng: array[0], lat: array[1]}
      })
    }

    // need to set 'c' here
    let c = countries.Finland

    if (c.geometry.type === "Polygon") {

      const shape = c.geometry.coordinates
      findLongestArr(shape)
      const useThisArray = shape[longestArrayIndex]
      const shapeLength = useThisArray.length
      const pretty = prettyCoords(useThisArray)
      const bigPoly = new google.maps.Polygon({
        paths: pretty,
        strokeColor: '#ffff00',
        strokeOpacity: 0.80,
        strokeWeight: 3,
        fillColor: '#ffff00',
        fillOpacity: 0.05
      });

      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: parseInt(zoomSize(shapeLength), 10),
        center: {
          lng: reduceLng(useThisArray) / shapeLength,
          lat: reduceLat(useThisArray) / shapeLength
        },
        mapTypeId: 'satellite'
      })
      bigPoly.setMap(map)

    } else {
      const shape = c.geometry.coordinates
      const shapeFlat = Array.prototype.concat.apply([], shape)
      findLongestArr(shape)
      const useThisArray = Array.prototype.concat.apply([], shape[longestArrayIndex])
      const shapeLength = useThisArray.length
      const pretty = prettyCoords(useThisArray)
      const bigPoly = new google.maps.Polygon({
        paths: pretty,
        strokeColor: '#ffff00',
        strokeOpacity: 0.80,
        strokeWeight: 3,
        fillColor: '#ffff00',
        fillOpacity: 0.30
      })

      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: parseInt(zoomSize(shapeLength), 10),
        center: {
          lng: reduceLng(useThisArray) / shapeLength,
          lat: reduceLat(useThisArray) / shapeLength
        },
        mapTypeId: 'satellite'
      })
      bigPoly.setMap(map)
    }

}
