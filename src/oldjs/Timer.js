import hillo from 'hillo'

const list = []

export function addToTimerList (i) {
  list.push(i)
}

export function clearAllTimer () {
  list.map(clearInterval)
  list.length = 0
}

export function printNow () {
  setTimeout(() => {
    hillo.get('Printer.php?op=printAll')
  }, 10)
}
