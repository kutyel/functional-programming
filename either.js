// const Either = Right || Left

const Right = x => ({
  map: f => Right(f(x)),
  fold: (_, g) => g(x),
  inspect: () => `Right(${x})`
})

const Left = x => ({
  map: _ => Left(x),
  fold: f => f(x),
  inspect: () => `Left(${x})`
})

module.exports = { Left, Right }
