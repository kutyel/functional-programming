const add = (x, y) => x + y

const compose = (...fns) => args => fns.reduceRight((x, f) => f(x), args)

const concat = (_, y) => xs => xs.concat(y) // FIXME: very strange implementation... 🤔

const curry = (f, arr = []) => (...args) =>
  (x => (x.length >= f.length ? f(...x) : curry(f, x)))([...arr, ...args])

const filter = f => xs => xs.filter(f)

const flip = f => (x, y, ...args) => f(y, x, ...args)

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
