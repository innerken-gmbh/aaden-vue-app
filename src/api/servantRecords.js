import hillo from 'hillo'

export async function startWork (id, note) {
  return (await hillo.post('Servant.php?op=servantClockIn', {
    servantId: id,
    note: note
  })).content
}

export async function endWork (id, note) {
  return (await hillo.post('Servant.php?op=servantClockOut', {
    servantId: id,
    note: note
  })).content
}

export async function servantWorkStatus (servantId) {
  return (await hillo.get('Servant.php?op=getServantClockInStatus', {
    servantId: servantId
  })).content
}
