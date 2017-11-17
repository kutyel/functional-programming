const fs = require('fs')
const Box = require('./box')
const { Left, Right } = require('./either')

const nextCharFromNumberString = str =>
  Box(str)
    .map(s => s.trim())
    .map(parseInt)
    .map(i => i + 1)
    .map(String.fromCharCode)
    .fold(c => c.toLowerCase())

const moneyToFloat = str =>
  Box(str)
    .map(s => s.replace(/\€/g, ''))
    .map(parseFloat)

const percentToFloat = str =>
  Box(str)
    .map(s => s.replace(/\%/g, ''))
    .map(parseFloat)
    .map(n => n * 0.01)

const applyDiscount = (price, discount) =>
  moneyToFloat(price).fold(cost =>
    percentToFloat(discount).fold(savings => cost - cost * savings)
  )

console.log(applyDiscount('5.00€', '20%')) // 4 (€)

const fromNullable = x => (x != null ? Right(x) : Left(null))

const findColor = name =>
  fromNullable({ red: '#f00', green: '#0f0', blue: '#00f' }[name])

const returnHexColor = n =>
  findColor(n)
    .map(c => c.slice(1))
    .fold(_ => 'COLOR NOT FOUND', c => c.toUpperCase())

console.log(returnHexColor('blue')) // 00F
console.log(returnHexColor('yellow')) // COLOR NOT FOUND

const tryCatch = f => {
  try {
    return Right(f())
  } catch (e) {
    return Left(e)
  }
}

const getPort = file =>
  tryCatch(() => fs.readFileSync(file))
    .chain(c => tryCatch(() => JSON.parse(c)))
    .fold(_ => 3000, c => c.port)

console.log(getPort('config.json')) // 8080
console.log(getPort()) // 3000
