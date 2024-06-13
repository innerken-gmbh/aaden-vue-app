import hillo from 'hillo'

export async function getCurrentOrderInfo (tableId) {
  return (await hillo.silentGet(
    'Tables.php',
    {
      op: 'currentInfo',
      id: tableId
    },
    { noDebug: true }
  )).content
}
