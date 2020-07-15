const list = []

export function addToTimerList (i) {
  list.push(i)
}

export function clearAllTimer () {
  list.map(clearInterval)
  list.length = 0
}
