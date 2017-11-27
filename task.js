const fs = require('fs')
const Task = require('data.task')

const launchMissiles = () =>
  new Task((_, res) => {
    console.log('Launch missiles! 🚀🚀🚀')
    res('missile')
  })

launchMissiles()
  .map(x => x + '!')
  .map(x => x + '!')
  // Nothing happens until we fork the task with both paths
  .fork(e => console.error('ERROR:', e), x => console.log('SUCCESS:', x))

const readFile = (filename, enc) =>
  new Task((rej, res) =>
    fs.readFile(
      filename,
      enc,
      (err, contents) => (err ? rej(err) : res(contents))
    )
  )

const writeFile = (filename, contents) =>
  new Task((rej, res) =>
    fs.writeFile(
      filename,
      contents,
      (err, success) => (err ? rej(err) : res(success))
    )
  )

const app = readFile('config.json', 'utf-8')
  .map(contents => contents.replace(/8/g, '6'))
  .chain(contents => writeFile('config1.json', contents))

app.fork(e => console.error(e), () => console.log('success!'))
