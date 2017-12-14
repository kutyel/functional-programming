const path = require('path')
const {
  either,
  IO,
  Left,
  Maybe,
  Right,
  Task,
  unsafePerformIO
} = require('../functors')
const {
  chain,
  curry,
  compose,
  identity,
  prop,
  split,
  last,
  map
} = require('..')

describe('You are now a MONAD genius!!! 🤓 👏🏼 👏🏼 👏🏼', () => {
  // Exercise 1
  test('Use safeProp and map/join or chain to safely get the street name when given a user.', () => {
    const safeProp = curry((x, o) => Maybe.of(o[x]))
    const user = {
      id: 2,
      name: 'albert',
      address: {
        street: {
          number: 22,
          name: 'Walnut St'
        }
      }
    }
    const ex1 = compose(
      chain(safeProp('name')),
      chain(safeProp('street')),
      safeProp('address')
    )
    expect(ex1({})).toEqual(Maybe.of(null))
    expect(ex1(user)).toEqual(Maybe.of('Walnut St'))
  })

  // Exercise 2
  test("Use getFile to get the filename, remove the directory so it's just the file, then purely log it.", () => {
    const getFile = () => new IO(() => __filename)
    const pureLog = x =>
      new IO(() => {
        console.log(x)
        return `logged ${x}`
      })
    const ex2 = compose(chain(compose(pureLog, last, split(path.sep))), getFile)
    expect(ex2().unsafePerformIO()).toBe('logged monads.js')
  })

  // Exercise 3
  test("Use getPost() then pass the post's id to getComments().", () => {
    const getPost = i =>
      new Task((rej, res) =>
        setTimeout(() => res({ id: i, title: 'Love them tasks' }), 300)
      )
    const getComments = i =>
      new Task((rej, res) =>
        setTimeout(
          () =>
            res([
              { post_id: i, body: 'This book should be illegal' },
              { post_id: i, body: 'Monads are like smelly shallots' }
            ]),
          300
        )
      )
    const ex3 = compose(chain(compose(getComments, prop('id'))), getPost)
    ex3(13).fork(console.log, res => {
      expect(res.map(prop('post_id'))).toEqual([13, 13])
      expect(res.map(prop('body'))).toEqual([
        'This book should be illegal',
        'Monads are like smelly shallots'
      ])
    })
  })

  // Exercise 4
  test("Use validateEmail, addToMailingList, and emailBlast to implement ex4's type signature.", () => {
    //  addToMailingList :: Email -> IO([Email])
    const addToMailingList = (list => email => new IO(() => [...list, email]))(
      []
    )
    const emailBlast = list => new IO(() => `emailed: ${list.join(',')}`)
    const validateEmail = x =>
      x.match(/\S+@\S+\.\S+/) ? new Right(x) : new Left('invalid email')
    //  ex4 :: Email -> Either String (IO String)
    const ex4 = compose(
      map(compose(emailBlast, addToMailingList)),
      validateEmail
    )
    const getResult = either(identity, unsafePerformIO)
    expect(getResult(ex4('notanemail'))).toBe('invalid email')
    expect(getResult(ex4('flaviocorpa@gmail.com'))).toBe(
      'emailed: flaviocorpa@gmail.com'
    )
  })
})
