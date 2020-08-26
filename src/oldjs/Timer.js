import { hillo } from 'innerken-utils'

const list = []

export function addToTimerList (i) {
  list.push(i)
}

export function clearAllTimer () {
  list.map(clearInterval)
  list.length = 0
}

export async function printNow () {
  setTimeout(async () => {
    const res = await hillo.get('Printer.php?op=printAll')
    console.log(res)
  }, 1)
}
