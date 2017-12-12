/**
 * Natural Transformations
 * - nt(x).map(f) === nt(x.map(f))
 *
 *        map(f)
 * F(a) ---------> F(b)
 *     |         |
 *  nt |         | nt
 *     |         |
 * G(a) ---------> G(b)
 *        map(f)
 */
const Task = require('data.task')
const Box = require('./box')
const { Right, fromNullable } = require('./either')

const boxToEither = b => b.fold(Right)

const double = x => x * 2
const res1 = boxToEither(Box(100)).map(double)
const res2 = boxToEither(Box(100).map(double))
console.log(res1, res2)

const eitherToTask = e => e.fold(Task.rejected, Task.of)

eitherToTask(Right('eitherToTask')).fork(console.error, console.log)

const first = xs => fromNullable(xs[0])
const res3 = first([1, 2, 3]).map(double)
const res4 = first([1, 2, 3].map(double))
console.log(res3, res4)
