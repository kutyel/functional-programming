// Our first functor! 🎉
const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
})

const LazyBox = g => ({
  map: f => LazyBox(() => f(g())),
  fold: f => f(g())
})

module.exports = Box
