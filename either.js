// const Either = Right || Left

const Right = x => ({
  map: f => Right(f(x)),
  chain: f => f(x),
  fold: (_, g) => g(x),
  inspect: () => `Right(${x})`
})

const Left = x => ({
  map: _ => Left(x),
  chain: _ => Left(x),
  fold: f => f(x),
  inspect: () => `Left(${x})`
})

const fromNullable = x => (x != null ? Right(x) : Left(null))

module.exports = { Left, Right, fromNullable }
