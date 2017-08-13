export function shuffleArray(a) {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
  return a
}

export function sortNames(playersScoreArray) {
  return playersScoreArray.sort(function(a, b) {
    return b.totalPoints - a.totalPoints
  })
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export function uniqueArray(array) {
  let tempArray = []
  array.forEach(el => {
    if (tempArray.indexOf(el) === -1) {
      tempArray.push(el)
    }
  })
  return tempArray
}
