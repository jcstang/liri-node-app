console.log('Spotify keys file loaded');

// what is the difference between:
// this (in instructions)
// exports.spotify = {
//   id: process.env.SPOTIFY_ID,
//   secret: process.env.SPOTIFY_SECRET
// }


// and this? 
const mySpotifyCredentials = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
}
module.exports = {
  mySpotifyCredentials: mySpotifyCredentials
}