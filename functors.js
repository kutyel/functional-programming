const Task = require('data.task')
const { compose, curry, identity } = require('.')

/**
 * Identity
 */
class Identity {
  constructor (x) {
    this.__value = x
  }

  static of (x) {
    return new Identity(x)
  }

  map (f) {
    return Identity.of(f(this.__value))
  }
}

/**
 * Maybe
 */
class Maybe {
  constructor (x) {
    this.__value = x
  }

  static of (x) {
    return new Maybe(x)
  }

  ap (functor) {
    return this.isNothing() ? Maybe.of(null) : functor.map(this.__value)
  }

  isNothing (f) {
    return this.__value === null || this.__value === undefined
  }

  map (f) {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value))
  }

  join () {
    return this.isNothing() ? Maybe.of(null) : this.__value
  }
}

/**
 * Left
 */
class Left {
  constructor (x) {
    this.__value = x
  }

  // TODO: remove this nonsense
  static of (x) {
    return new Left(x)
  }

  map (f) {
    return this
  }
}

/**
 * Right
 */
class Right {
  constructor (x) {
    this.__value = x
  }

  // TODO: remove in favor of Either.of
  static of (x) {
    return new Right(x)
  }

  map (f) {
    return Right.of(f(this.__value))
  }
}

/**
 * IO
 */
class IO {
  constructor (f) {
    this.unsafePerformIO = f
  }

  static of (x) {
    return new IO(() => x)
  }

  chain (f) {
    return this.map(f).join()
  }

  ap (functor) {
    return this.chain(f => functor.map(f))
  }

  map (f) {
    return new IO(compose(f, this.unsafePerformIO))
  }

  join () {
    return this.unsafePerformIO()
  }
}

const unsafePerformIO = x => x.unsafePerformIO()

const either = curry((f, g, e) => {
  switch (e.constructor) {
    case Left:
      return f(e.__value)
    case Right:
      return g(e.__value)
  }
})

const liftA2 = curry((f, fx, fy) => fx.map(f).ap(fy))

Task.prototype.join = function () {
  return this.chain(identity)
}

module.exports = {
  either,
  Identity,
  IO,
  Left,
  liftA2,
  Maybe,
  Right,
  Task,
  unsafePerformIO
}
