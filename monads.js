/**
 * Box, Either, Task, List...
 * F.of / pure (pointed functor) + chain (flatMap, bind, >>=)
 *
 * - Associativity: join(m.map(join)) === join(join(m))
 * - Left/Right identity: join(Box.of(m)) === join(m.map(Box.of))
 */
const Box = x => ({
  map: f => Box(f(x)),
  chain: f => f(x),
  inspect: () => `Box(${x})`
})

Box.of = Box

const join = m => m.chain(x => x)

const m = Box(Box(Box(3)))

console.log(join(m.map(join)), join(join(m)))
// > Box(3) === Box(3)

const n = Box('wonder')

console.log(join(Box.of(n)), join(n.map(Box.of)))
// > Box(wonder) === Box(wonder)
