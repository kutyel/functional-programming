export const add = (x, y) => x + y

export const compose = (...fns) => args => fns.reduceRight((x, f) => f(x), args)

export const curry = (f, arr = []) => (...args) =>
  (x => (x.length >= f.length ? f(...x) : curry(f, x)))([...arr, ...args])

export const concat = curry((x, y) => x.concat(y))

export const filter = f => xs => xs.filter(f)

export const flip = f => curry((x, y, ...args) => f(y, x, ...args))

export const head = xs => xs[0]

export const join = char => x => x.join(char)

export const last = xs => xs[xs.length - 1]

export const map = f => xs => xs.map(f)

export const prop = prop => obj => obj[prop]

export const reduce = curry((reducer, init, xs) => xs.reduce(reducer, init))

export const replace = (regex, char) => str => str.replace(regex, char)

export const sortBy = f => xs => xs.sort((x, y) => f(x) > f(y))

export const split = char => x => x.split(char)

export const toLower = str => str.toLowerCase()
