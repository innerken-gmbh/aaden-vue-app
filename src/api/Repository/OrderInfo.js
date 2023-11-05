import hillo from 'hillo'

export async function getCurrentOrderInfo (tableId) {
  try {
    return (await hillo.silentGet(
      'Tables.php',
      {
        op: 'currentInfo',
        id: tableId
      },
      { noDebug: true }
    )).content
  } catch (e) {
    return null
  }
}
