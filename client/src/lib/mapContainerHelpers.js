export function prettyCoords(arr) {
  return arr.map(function(array) {
    return {lng: array[0], lat: array[1]}
  })
}

export function orderCountries(mapDisplayOrder, asyncCountries) {
  let newOrder = mapDisplayOrder.map(ordered => {
    return asyncCountries.filter(country => country.name === ordered)
  })
  return newOrder.reduce((a, b) => {
    return a.concat(b)
  }, [])
}

export function generateMultiChoice(shuffled, firsts) {
  return shuffled.map((shuffledArr, index) => {
    let shuffledIndex = shuffledArr.indexOf(firsts[index])
    switch (shuffledIndex) {
      case 0:
        return 'A'
      case 1:
        return 'B'
      case 2:
        return 'C'
      case 3:
        return 'D'
      default:
        return 'Error occurred.'
    }
  })
}
