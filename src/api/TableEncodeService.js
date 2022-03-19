const limit = Number.MAX_SAFE_INTEGER / 8

// 可以循环调用，但最多8次
export function encodeTwoNumber (a, b) {
  return a * limit + b
}

export function decodeNumber (number) {
  return [Math.floor(number / limit), number % limit]
}
