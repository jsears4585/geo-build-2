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
