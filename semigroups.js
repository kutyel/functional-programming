// Semigroups simply implement a `concat()` method
// that is associative (Examples: String, Array...)

const Sum = x => ({
  x,
  concat: ({ x: y }) => Sum(x + y),
  inspect: () => `Sum(${x})`
})

console.log(Sum(1).concat(Sum(2))) // Sum(3)

const All = x => ({
  x,
  concat: ({ x: y }) => All(x && y),
  inspect: () => `All(${x})`
})

console.log(All(true).concat(All(false))) // All(false)

const First = x => ({
  x,
  concat: () => First(x),
  inspect: () => `First(${x})`
})

console.log(First('first').concat(First('second'))) // First(first)
