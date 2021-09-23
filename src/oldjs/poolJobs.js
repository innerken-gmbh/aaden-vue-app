export const ExecuteQueue = {}
export const timer = setInterval(execute, 3000)

function execute () {
  // console.log('Pooling Queue Length:', Object.keys(ExecuteQueue).length)
  Object.values(ExecuteQueue).forEach(i => {
    i()
  })
}

export function addToQueue (key, executor) {
  ExecuteQueue[key] = executor
}
