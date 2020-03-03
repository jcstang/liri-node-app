const dotenv = require("dotenv").config();
const keys = require("./keys.js");
const axios = require('axios');
const Spotify = require('node-spotify-api');
const fileAccess = require('fs');
const runCommand = require('child_process');
const movie = require('@jcstang/get-movie');

let spotify = new Spotify(keys.mySpotifyCredentials);


// ===================================================
// functions
// ===================================================
function runMainProcess(argsArray) {
  const userCommand = argsArray[0];
  const searchParam = argsArray[1];

  switch (userCommand) {
    case 'concert-this':
      goGetBandData(searchParam);
      break;
    
    case 'spotify-this-song':
      goGetSpotifyData(searchParam);
      break;
    
    case 'movie-this':
      // goGetMovieData(searchParam);
      movie.getMovie(searchParam, 'trilogy');
      break;
    
    case 'do-what-it-says':
      console.log('Looking at: random.txt for instructions...');
      doWhatFileSays();
      break;
    
    default:
      console.log("Usage: node liri.js <command> <searchTerm>");
      break;
  }
}

function doWhatFileSays() {
  fileAccess.readFile('./random.txt', { encoding: 'utf8'}, function(err, data) {
    if (err) {
      console.error(error);
    }

    //success
    let commandString = 'node liri.js';
    let fileArr = data.split(',');

    fileArr.forEach(element => {
      commandString += ` ${element}`;
    });

    // console.log(commandString);

    // runCommand.spawn(commandString);
    runCommand.exec(commandString, (err, stdout, stderr) => {
      if (err) {
        console.log(`error: ${error.message}`);
        return;
      }

      if(stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log('thinking...');
      // console.log(`stdout: ${stdout}`);
      console.log(stdout);
    

    });


  });

}


function goGetMovieData(searchTerm) {
  searchTerm = encodeURIComponent(searchTerm.trim());
  let queryURL = `http://www.omdbapi.com/?t=${searchTerm}&y=&plot=short&apikey=trilogy`;
    
    axios.get(queryURL)
    .then(function (response) {
      // handle success
      // console.log(response);
      let movieData = response.data;

      if (movieData.Response === 'False') {
        return console.log(`No go!... ${movieData.Error}`);
      } else {
        // found a movie
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

    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // always executed
      console.log(
        `\nBye!`
      );
      
    });

}


function goGetSpotifyData(searchTerm) {

  spotify.search({ type: 'track', query: searchTerm }, function (err, data) {
    if (err) {
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

  })
  .catch(error => {
    console.log(error);
  })
  .finally(function() {
    // always executed
  })

}


// ===================================================
// EXPORTS
// ===================================================
module.exports = {
  goGetMovieData: goGetMovieData,
  goGetSpotifyData: goGetSpotifyData,
  goGetBandData: goGetBandData,
  runMainProcess: runMainProcess
}