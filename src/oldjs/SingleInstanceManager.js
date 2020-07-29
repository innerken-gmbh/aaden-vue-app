export function instanceManager () {
  const vendor = {}
  const fetchInstance = function (type, createFunction) {
    if (!vendor[type]) {
      vendor[type] = createFunction()
    }
    return vendor[type]
  }
  return { fetchInstance }
}
