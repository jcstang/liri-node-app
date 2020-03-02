const dotenv = require("dotenv").config();
const Spotify = require('node-spotify-api');
const keys = require("./keys.js");
const axios = require('axios');

let spotify = new Spotify(keys.mySpotifyCredentials);

let args = process.argv.slice(2);
let usageMessage = "Usage: node liri.js <command> <searchTerm>";


if (args.length <= 0) {
  console.log(usageMessage);
  process.exit(-1);
}

console.log('Wait for it......\n');

switch (args[0]) {
  case 'concert-this':
    goGetBandData(args[1]);
    break;

  case 'spotify-this-song':
    goGetSpotifyData(args[1]);
    break;

  case 'movie-this':
    goGetMovieData(args[1]);
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

function goGetMovieData(searchTerm) {
  searchTerm = encodeURIComponent(searchTerm.trim());
  let queryURL = `http://www.omdbapi.com/?t=${searchTerm}&y=&plot=short&apikey=trilogy`;

  axios.get(queryURL)
    .then(response => {
      // console.log(response.data);
      let movieData = response.data;

      if (movieData) {
        console.log("-----------------------------------------------");
        console.log(`Title:\t\t\t ${movieData.Title}`);
        console.log(`Year:\t\t\t ${movieData.Year}`);
        console.log(`IMDB rating:\t\t ${movieData.Ratings[0].Value}`);
        console.log(`Rotten Tomatoes rating:\t ${movieData.Ratings[1].Value}`);
        console.log(`Movie Produced in:\t ${movieData.Country}`);
        console.log(`Language:\t\t ${movieData.Language}`);
        console.log(`Plot:\t ${movieData.Plot}`);
        console.log(`Actors:\t ${movieData.Actors}`);
        console.log("-----------------------------------------------");
      }

    });

  // print this:
  // title of movie
  // year movie came out
  // IMDB rating
  // rotten tomatoes movie
  // country where movie was produced
  // language of movie
  // plot of the movie (prob short).
  // Actors in the movie
}


function goGetSpotifyData(searchTerm) {
  
  spotify.search({ type: 'track', query: searchTerm}, function(err, data) {
    if(err) {
      return console.log('Error occured: ' + err);
    }

    for (const obj of data.tracks.items) {
      // console.log(obj);

      console.log("-----------------------------------------------");
      console.log(`Artist:\t\t ${obj.album.artists[0].name}`);
      console.log(`Song:\t\t ${obj.name}`);
      console.log(`album:\t\t ${obj.album.name}`);
      console.log(`spotify link:\t ${obj.external_urls.spotify}`);
      console.log("-----------------------------------------------\n");
      
      // only getting the first result
      return;
    }

  });
}


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