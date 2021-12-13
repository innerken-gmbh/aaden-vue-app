export const ExecuteQueue = {}
export const timer = setInterval(execute, 3000)

function execute () {
  Object.values(ExecuteQueue).forEach(i => {
    i()
  })
}

export function addToQueue (key, executor) {
  ExecuteQueue[key] = executor
}