import hillo from 'hillo'

export async function previewZBon (startDate, endDate) {
  return (await hillo.get('ZBon.php?op=previewBySpan', { startDate, endDate })).content
}

export async function printXBon (startDate, endDate) {
  return (await hillo.post('Complex.php?op=printSummary', {
    timespan: startDate + ' - ' + endDate
  })).content
}

export async function printZBon () {
  return (await hillo.post('ZBon.php?op=printZbon')).content
}

export async function printZBonUseDate (startDate, endDate, printByDay = 1, resetTable = false) {
  return (await hillo.post('ZBon.php?op=printZbonBySpan',
    { startDate, endDate, printByDay, resetTable }))
}

export async function ZBonList () {
  return (await hillo.get('ZBon.php')).content
}
