const dotenv = require('dotenv').config();
const Spotify = require('node-spotify-api');
const spotifyCreds = require('./spotifyCreds');

const config = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
};


let spotify = new Spotify(spotifyCreds);

spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }

  console.log(data);
});