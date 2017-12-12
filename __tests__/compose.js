const accounting = require('accounting')
const {
  add,
  compose,
  concat,
  filter,
  flip,
  head,
  join,
  last,
  map,
  prop,
  reduce,
  replace,
  sortBy,
  toLower
} = require('..')

// Example Data
const CARS = [
  {
    name: 'Ferrari FF',
    horsepower: 660,
    dollar_value: 700000,
    in_stock: true
  },
  {
    name: 'Spyker C12 Zagato',
    horsepower: 650,
    dollar_value: 648000,
    in_stock: false
  },
  {
    name: 'Jaguar XKR-S',
    horsepower: 550,
    dollar_value: 132000,
    in_stock: false
  },
  {
    name: 'Audi R8',
    horsepower: 525,
    dollar_value: 114200,
    in_stock: false
  },
  {
    name: 'Aston Martin One-77',
    horsepower: 750,
    dollar_value: 1850000,
    in_stock: true
  },
  {
    name: 'Pagani Huayra',
    horsepower: 700,
    dollar_value: 1300000,
    in_stock: false
  }
]

describe('You are now a genius of compose!!! 🤓 👏🏼 👏🏼 👏🏼', () => {
  // Exercise 1
  test('Use compose() to rewrite the function below. Hint: prop() is curried.', () => {
    const isLastInStock = compose(prop('in_stock'), last)
    expect(isLastInStock(CARS)).toBe(false)
  })

  // Exercise 2:
  test('Use compose(), prop() and head() to retrieve the name of the first car.', () => {
    const nameOfFirstCar = compose(prop('name'), head)
    expect(nameOfFirstCar(CARS)).toBe('Ferrari FF')
  })

  // Exercise 3:
  test('Use the helper function _average to refactor averageDollarValue as a composition.', () => {
    const _average = xs => reduce(add, 0, xs) / xs.length // <- LEAVE BE
    const averageDollarValue = compose(_average, map(prop('dollar_value')))
    expect(averageDollarValue(CARS)).toBe(790700)
  })

  // Exercise 4:
  test("Write a function: sanitizeNames() using compose that returns a list of lowercase and underscored car's names:", () => {
    // e.g: sanitizeNames([{name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true}]) //=> ['ferrari_ff'].
    const _underscore = replace(/\W+/g, '_') // <-- leave this alone and use to sanitize
    const sanitizeNames = map(compose(_underscore, toLower, prop('name')))
    const expected = [
      'ferrari_ff',
      'spyker_c12_zagato',
      'jaguar_xkr_s',
      'audi_r8',
      'aston_martin_one_77',
      'pagani_huayra'
    ]
    expect(sanitizeNames(CARS)).toEqual(expected)
  })

  // Bonus 1:
  test('Refactor availablePrices with compose.', () => {
    const _formatPrice = compose(accounting.formatMoney, prop('dollar_value'))
    const availablePrices = compose(
      join(', '),
      map(_formatPrice),
      filter(prop('in_stock'))
    )
    expect(availablePrices(CARS)).toBe('$700,000.00, $1,850,000.00')
  })

  // Bonus 2:
  test('Refactor to pointfree. Hint: you can use flip().', () => {
    const _append = flip(concat)
    const fastestCar = compose(
      _append(' is the fastest'),
      prop('name'),
      last,
      sortBy(prop('horsepower'))
    )
    expect(fastestCar(CARS)).toBe('Aston Martin One-77 is the fastest')
  })
})
