const { add, curry, reduce } = require('..')
const { liftA2, Maybe, Task, IO } = require('../functors')

// TEST HELPERS
// =====================

const getPost = i =>
  new Task((rej, res) =>
    setTimeout(() => res({ id: i, title: 'Love them futures' }), 300)
  )

const getComments = i =>
  new Task((rej, res) =>
    setTimeout(
      () =>
        res(['This book should be illegal', 'Monads are like space burritos']),
      300
    )
  )

// fib browser for test
const localStorage = {}

describe('Applicative Functors', () => {
  // Exercise 1
  test('Write a function that adds two possibly null numbers together using Maybe and ap().', () => {
    //  ex1 :: Number -> Number -> Maybe Number
    const ex1 = (x, y) =>
      Maybe.of(add)
        .ap(Maybe.of(x))
        .ap(Maybe.of(y))
    expect(ex1(2, 3)).toEqual(Maybe.of(5))
    expect(ex1(null, 3)).toEqual(Maybe.of(null))
  })

  // Exercise 2
  test("Now write a function that takes 2 Maybe's and adds them. Use liftA2 instead of ap().", () => {
    //  ex2 :: Maybe Number -> Maybe Number -> Maybe Number
    const ex2 = liftA2(add)
    expect(ex2(Maybe.of(2), Maybe.of(3))).toEqual(Maybe.of(5))
    expect(ex2(Maybe.of(null), Maybe.of(3))).toEqual(Maybe.of(null))
  })

  // Exercise 3
  test('Run both getPost(n) and getComments(n) then render the page with both. (The n arg is arbitrary.)', () => {
    const makeComments = reduce((acc, c) => `${acc}<li>${c}</li>`, '')
    const render = curry(
      ({ title }, cs) => `<div>${title}</div>${makeComments(cs)}`
    )
    //  ex3 :: Task Error HTML
    const ex3 = liftA2(render, getPost(13), getComments(13))
    ex3.fork(console.log, html =>
      expect(html).toBe(
        '<div>Love them futures</div><li>This book should be illegal</li><li>Monads are like space burritos</li>'
      )
    )
  })

  // Exercise 4
  test('Write an IO that gets both player1 and player2 from the cache and starts the game.', () => {
    localStorage.player1 = 'toby'
    localStorage.player2 = 'sally'
    const getCache = x => new IO(() => localStorage[x])
    const game = curry((p1, p2) => `${p1} vs ${p2}`)
    //  ex4 :: IO String
    const ex4 = liftA2(game, getCache('player1'), getCache('player2'))
    expect(ex4.unsafePerformIO()).toBe('toby vs sally')
  })
})
