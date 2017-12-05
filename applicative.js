/**
 * Applicative Functors:
 * - F(x).map(f) === F(f).ap(F(x))
 */

const Box = require('./box')

const add = x => y => x + y

console.log(
  Box(add)
    .ap(Box(1))
    .ap(Box(4))
) // > Box(5)

const liftA2 = (f, fx, fy) => fx.map(f).ap(fy)
const liftA3 = (f, fx, fy, fz) =>
  fx
    .map(f)
    .ap(fy)
    .ap(fz)

console.log(liftA2(add, Box(2), Box(4))) // > Box(6)

module.exports = { liftA2, liftA3 }
