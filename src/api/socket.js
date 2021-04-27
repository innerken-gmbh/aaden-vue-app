import { io } from 'socket.io-client'

export const socket = io('localhost:5213')

export function trySocket () {
  console.log(' i am socket')
  socket.send('I am good')
  socket.emit('message', 'message')
  socket.onAny(() => {
  })
}
