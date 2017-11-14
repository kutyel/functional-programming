const Box = require('./box')

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
