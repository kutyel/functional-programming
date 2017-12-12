const curry = (f, arr = []) => (...args) =>
  (x => (x.length >= f.length ? f(...x) : curry(f, x)))([...arr, ...args])

const filter = f => xs => xs.filter(f)

const map = f => xs => xs.map(f)

const reduce = (reducer, init) => xs => xs.reduce(reducer, init)

const split = char => x => x.split(char)

module.exports = {
  curry,
  filter,
  map,
  reduce,
  split
}
