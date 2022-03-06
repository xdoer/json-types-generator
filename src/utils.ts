export function is(ele: any) {
  const type = Object.prototype.toString.call(ele)
  return type.match(/^\[object\s([A-Za-z]+)\]$/)![1].toLowerCase()
}

export function upFirst(value = '') {
  return value.replace(/^[a-z]/, function(g) {
    return g.toUpperCase()
  })
}

export const getName = (() => {
  let i = 0
  return function() {
    return 'A' + i++
  }
})()
