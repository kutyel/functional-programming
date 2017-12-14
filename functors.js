const Task = require('data.task')
const { compose, curry, identity } = require('.')

// const inspect = x => (x && x.inspect ? x.inspect() : x)

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

// Identity.prototype.inspect = function () {
//   return 'Identity(' + inspect(this.__value) + ')'
// }

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

  isNothing (f) {
    return this.__value === null || this.__value === undefined
  }

  map (f) {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value))
  }

  // chain(f) {
  //   return this.map(f).join()
  // }

  join () {
    return this.isNothing() ? Maybe.of(null) : this.__value
  }
}

// Maybe.prototype.ap = function (other) {
//   return this.isNothing() ? Maybe.of(null) : other.map(this.__value)
// }

// Maybe.prototype.inspect = function () {
//   return 'Maybe(' + inspect(this.__value) + ')'
// }

// Either
// const Either = function () {}

// Either.of = function (x) {
//   return new Right(x)
// }

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

// Left.prototype.ap = function (other) {
//   return this
// }

// Left.prototype.join = function () {
//   return this
// }

// Left.prototype.chain = function () {
//   return this
// }

// Left.prototype.inspect = function () {
//   return 'Left(' + inspect(this.__value) + ')'
// }

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

// Right.prototype.join = function () {
//   return this.__value
// }

// Right.prototype.chain = function (f) {
//   return f(this.__value)
// }

// Right.prototype.ap = function (other) {
//   return this.chain(function (f) {
//     return other.map(f)
//   })
// }

// Right.prototype.join = function () {
//   return this.__value
// }

// Right.prototype.chain = function (f) {
//   return f(this.__value)
// }

// Right.prototype.inspect = function () {
//   return 'Right(' + inspect(this.__value) + ')'
// }

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

  map (f) {
    return new IO(compose(f, this.unsafePerformIO))
  }

  join () {
    return this.unsafePerformIO()
  }
}

// IO.prototype.chain = function (f) {
//   return this.map(f).join()
// }

// IO.prototype.ap = function (a) {
//   return this.chain(function (f) {
//     return a.map(f)
//   })
// }

// IO.prototype.inspect = function () {
//   return 'IO(' + inspect(this.unsafePerformIO) + ')'
// }

const unsafePerformIO = x => x.unsafePerformIO()

const either = curry((f, g, e) => {
  switch (e.constructor) {
    case Left:
      return f(e.__value)
    case Right:
      return g(e.__value)
  }
})

Task.prototype.join = function () {
  return this.chain(identity)
}

module.exports = {
  either,
  Identity,
  IO,
  Left,
  Maybe,
  Right,
  Task,
  unsafePerformIO
}
