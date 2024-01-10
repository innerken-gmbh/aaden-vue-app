import hillo from 'hillo'

export async function getCurrentOrderInfo (tableId) {
  const tableInfo = (await hillo.silentGet('Tables.php')).content.find(it => it.id === tableId)
  const result = {
    tableName: tableInfo?.name,
    tableId: tableInfo?.id,
    isActive: parseInt(tableInfo?.usageStatus),
    order: null
  }
  if (result.isActive) {
    const info = (await hillo.silentGet(
      'Tables.php',
      {
        op: 'currentInfo',
        id: tableId
      },
      { noDebug: true }
    )).content
    result.order = {
      ...info.order,
      ...info
    }
    console.log(result.order)
  }
  return result
}
