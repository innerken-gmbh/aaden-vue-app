import hillo from 'hillo'

export async function payWithCard (ip, amount) {
  try {
    return (await hillo.get('CardTerminal.php', { ip, amount }, { timeout: 300 * 1000 })) === 'good'
  } catch (e) {
    console.log(e)
    return false
  }
}
