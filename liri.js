require("dotenv").config();
const Spotify = require('node-spotify-api');
const keys = require("./keys.js");

let spotify = new Spotify(keys.mySpotifyCredentials);

console.log(spotify);


// command line commands:
// concert-this
// node liri.js concert-this <artist/band name here>

// spotify-this-song
//node liri.js spotify-this-song '<song name here>'

// movie-this
// node liri.js movie-this '<movie name here>'

// do-what-it-says
// node liri.js do-what-it-says