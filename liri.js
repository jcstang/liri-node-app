require("dotenv").config();
const Spotify = require('node-spotify-api');
const keys = require("./keys.js");
var argv = require('yargs').argv;

let spotify = new Spotify(keys.mySpotifyCredentials);

// TODO: get command line args
let args = process.argv.slice(2);

if (process.argv.length > 2) {
  console.log('yay args!');

  switch (args[0]) {
    case 'concert-this':
      console.log('go to a concert?');
      break;
    case 'spotify-this-song':
      console.log('spotiy the song?');
      break;
    case 'movie-this':
      console.log('find a movie?');
      break;
    case 'do-what-it-says':
      console.log('do what it says!');
      break;
    default:
      console.log('sorry, I do not recognized that command.');
      break;
  }
  
} else {
  console.log('no args');
  
}