/**
 * A Monoid is a semigroup with an identity (or neutral) element
 *
 * In the following examples, the neutral element is the `empty` method
 */

const Product = x => ({
  x,
  concat: ({ x: y }) => Product(x * y)
})

Product.empty = () => Product(1)

const Any = x => ({
  x,
  concat: ({ x: y }) => Any(x || y)
})

Any.empty = () => Any(false)

const Max = x => ({
  x,
  concat: ({ x: y }) => Max(x > y ? x : y)
})

Max.empty = () => Max(-Infinity)

const Min = x => ({
  x,
  concat: ({ x: y }) => Min(x < y ? x : y)
})

Min.empty = () => Min(Infinity)
