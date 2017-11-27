const Task = require('data.task')

const launchMissiles = () =>
  new Task((_, res) => {
    console.log('Launch missiles! 🚀🚀🚀')
    res('missile')
  })

const app = launchMissiles().map(x => x + '!')

app
  .map(x => x + '!')
  // Nothing happens until we fork the task with both paths
  .fork(e => console.error('ERROR:', e), x => console.log('success!', x))
