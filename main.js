export const compose = (...fns) => args => fns.reduceRight((x, f) => f(x), args)

export const curry = (f, arr = []) => (...args) =>
  (x => (x.length >= f.length ? f(...x) : curry(f, x)))([...arr, ...args])

export const add = curry((x, y) => x + y)

export const assoc = curry((key, val, obj) => ({ ...obj, [key]: val }))

export const chain = curry((f, m) => m.map(f).join())

export const concat = curry((x, y) => x.concat(y))

export const filter = curry((f, xs) => xs.filter(f))

export const flip = f => curry((x, y, ...args) => f(y, x, ...args))

export const head = xs => xs[0]

export const identity = x => x

export const join = curry((char, x) => x.join(char))

export const last = xs => xs[xs.length - 1]

export const map = curry((f, xs) => xs.map(f))

export const prop = curry((prop, obj) => obj[prop])

export const reduce = curry((reducer, init, xs) => xs.reduce(reducer, init))

export const replace = curry((regex, char, str) => str.replace(regex, char))

export const sortBy = curry((f, xs) => xs.sort((x, y) => f(x) > f(y)))

export const split = curry((char, x) => x.split(char))

export const toLower = str => str.toLowerCase()

export const toUpper = str => str.toUpperCase()
