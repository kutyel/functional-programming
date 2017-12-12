// Semigroups simply implement a `concat()` method
// that is associative (Examples: String, Array...)

const Sum = x => ({
  x,
  concat: ({ x: y }) => Sum(x + y),
  inspect: () => `Sum(${x})`
})

Sum.empty = () => Sum(0)

console.log(Sum.empty().concat(Sum(1).concat(Sum(2)))) // Sum(3)

const All = x => ({
  x,
  concat: ({ x: y }) => All(x && y),
  inspect: () => `All(${x})`
})

All.empty = () => All(true)

console.log(All.empty().concat(All(false))) // All(false)

const First = x => ({
  x,
  concat: () => First(x),
  inspect: () => `First(${x})`
})

console.log(First('first').concat(First('second'))) // First(first)

const sum = xs => xs.reduce((acc, x) => acc + x, 0)

console.log(sum([1, 2, 3])) // 6

const all = xs => xs.reduce((acc, x) => acc && x, true)

console.log(all([true, false, true])) // false
