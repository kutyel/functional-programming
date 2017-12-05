/**
 * Our first functor! 🎉
 *
 * A functor has a map method and follows this principles:
 * - Distributive law: fx.map(f).map(g) === fx.map(x => g(f(x)))
 * - Identity law: fx.map(id) === id(fx)
 */
const Box = x => ({
  ap: b => b.map(x),
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
})

const LazyBox = g => ({
  map: f => LazyBox(() => f(g())),
  fold: f => f(g())
})

module.exports = Box
