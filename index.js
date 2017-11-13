'use strict'

// Our first functor! 🎉
const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`,
})

const nextCharFromNumberString = str =>
  Box(str)
    .map(s => s.trim())
    .map(parseInt)
    .map(i => i + 1)
    .map(String.fromCharCode)
    .fold(c => c.toLowerCase())

const result = nextCharFromNumberString('  64 ')

console.log(result) // 'a'

module.exports = Box
