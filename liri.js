require("dotenv").config();
const Spotify = require('node-spotify-api');
const keys = require("./keys.js");
const axios = require('axios');

let spotify = new Spotify(keys.mySpotifyCredentials);

// TODO: get command line args
let args = process.argv.slice(2);
let argLength = process.argv.length;
let usageMessage = "Usage: node liri.js <command> <searchTerm>";


if (argLength <= 2) {
  console.log(usageMessage);
  process.exit(-1);
}

switch (args[0]) {
  case 'concert-this':
    goGetBandData(args[1]);
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
    console.log(usageMessage);
    break;
}



// ===================================================
// functions
// ===================================================

function goGetBandData(searchTerm) {
  // adds the %20 thing in the spaces
  searchTerm = encodeURIComponent(searchTerm.trim());

  let queryURL = `https://rest.bandsintown.com/artists/${searchTerm}/events?app_id=codingbootcamp`;

  axios.get(queryURL)
    .then(response => {
      const data0 = response.data[0];
      console.log(`Artist:\t\t\t ${data0.artist.name}`);
      console.log(`Name of Venue:\t\t ${data0.venue.name}`);
      console.log(`Venue location:\t\t ${data0.venue.city}, ${data0.venue.region} ${data0.venue.country}`);
      console.log(`Date of the Event:\t ${data0.datetime}`);

    });

}