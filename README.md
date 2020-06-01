# liri-node-app

## Problem
Apple iOS environment has Siri, the voice assistant. I wanted to create a command-line program for this. 

Things I wanted it to do:
* Search for concerts
* Search a song name on spotify
* Search for movie related data. 


## Overview
App is a command line tool, using node to run a file, command, and search term. What makes me exited about this project is how clean my start file ended up being. I wanted to utilize helper functions.

## Tech used in the project
* Node.js
* [DotEnv](https://www.npmjs.com/package/dotenv)
* [OMDB API](http://www.omdbapi.com)
* [Axios](https://www.npmjs.com/package/axios)
* [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)



## Examples

### concert-this
```
node liri.js concert-this 'elton john'
```

### spotify-this-song
```
node liri.js spotify-this-song 'all the small things'
```

### movie-this
```
node liri.js movie-this aladdin
```

### do-what-it-says
```
node liri.js blah
```






### steps to approach the problem
1. Clearly state the problem the app is trying to solve (i.e. what is it doing and why)
2. Give a high-level overview of how the app is organized
3. Give start-to-finish instructions on how to run the app
4. Include screenshots, gifs or videos of the app functioning
5. Contain a link to a deployed version of the app
6. Clearly list the technologies used in the app
7. State your role in the app development
