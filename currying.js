const add = x => y => x + y

const inc = add(1) // (y => 1 + y)

console.log(inc(3)) // 4

const modulo = dvr => dvd => dvd % dvr

const isOdd = modulo(2)

const filter = pred => xs => xs.filter(pred)

const getAllOdds = filter(isOdd)

console.log(getAllOdds([1, 2, 3, 4])) // [ 1, 3 ]

const replace = regex => repl => str => str.replace(regex, repl)

const censor = replace(/[aeiou]/gi)('*')

console.log(censor('hello world')) // h*ll* w*rld

const map = f => xs => xs.map(f)

const censorAll = map(censor)

console.log(censorAll(['hello', 'world'])) // [ h*ll*, w*rld ]
