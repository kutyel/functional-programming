const add = (x, y) => x + y

const compose = (...fns) => args => fns.reduceRight((x, f) => f(x), args)

const curry = (f, arr = []) => (...args) =>
  (x => (x.length >= f.length ? f(...x) : curry(f, x)))([...arr, ...args])

const concat = curry((x, y) => x.concat(y))

const filter = f => xs => xs.filter(f)

const flip = f => curry((x, y, ...args) => f(y, x, ...args))

const head = xs => xs[0]

const join = char => x => x.join(char)

const last = xs => xs[xs.length - 1]

const map = f => xs => xs.map(f)

const prop = prop => obj => obj[prop]

const reduce = (reducer, init, arr) =>
  !!arr && arr.length
    ? arr.reduce(reducer, init) // arity 3
    : xs => xs.reduce(reducer, init) // arity 2

const replace = (regex, char) => str => str.replace(regex, char)

const sortBy = f => xs => xs.sort((x, y) => f(x) > f(y))

const split = char => x => x.split(char)

const toLower = str => str.toLowerCase()

module.exports = {
  add,
  compose,
  concat,
  curry,
  filter,
  flip,
  head,
  join,
  last,
  map,
  prop,
  reduce,
  replace,
  sortBy,
  split,
  toLower
}
