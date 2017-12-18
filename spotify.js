// https://api.spotify.com/v1/search?q=${query}&type=artist --> artists: {items: []}
// https://api.spotify.com/v1/artists/${id}/related-artists --> artists: []

const Either = require('data.either')
const request = require('request')
const Task = require('data.task')
const { List } = require('immutable-ext')

// #region Spotify
const httpGet = url =>
  new Task((rej, res) =>
    request(url, (error, response, body) => (error ? rej(error) : res(body)))
  )
const getJSON = url =>
  httpGet(url)
    .map(parse)
    .chain(eitherToTask)

const parse = Either.try(JSON.parse)
const first = xs => Either.fromNullable(xs[0])
const eitherToTask = e => e.fold(Task.rejected, Task.of)

// Task -> Either -> Artist
const findArtist = name =>
  getJSON(`https://api.spotify.com/v1/search?q=${name}&type=artist`)
    .map(result => result.artists.items)
    .map(first)
    .map(eitherToTask)

// Task -> [Artist]
const relatedArtists = id =>
  getJSON(`https://api.spotify.com/v1/artists/${id}/related-artists`).map(
    result => result.artists
  )
// #endregion

const argv = new Task((_, res) => res(process.argv))
const names = argv.map(args => args.slice(2))

const Intersection = xs => ({
  xs,
  concat: ({ xs: ys }) => Intersection(xs.filter(x => ys.some(y => x === y)))
})

const related = name =>
  findArtist(name)
    .map(artist => artist.id)
    .chain(relatedArtists)
    .map(artists => artists.map(artist => artist.name))

const artistIntersection = rels => rels.foldMap(Intersection).xs

const main = names =>
  List(names)
    .traverse(Task.of, related)
    .map(artistIntersection)

names.chain(main).fork(console.error, console.log)
