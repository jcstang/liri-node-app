require("dotenv").config();
const Spotify = require('node-spotify-api');
const keys = require("./keys.js");

let spotify = new Spotify(keys.mySpotifyCredentials);

console.log(spotify);

// TODO: get command line args