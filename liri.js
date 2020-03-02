const helperFuncs = require('./helper-functions');


// incorrect usage. exit program. 
if (process.argv.slice(2).length <= 0) {
  console.log("Usage: node liri.js <command> <searchTerm>");
  process.exit(-1);
}

console.log('Wait for it......\n');
helperFuncs.whichQuestion( process.argv.slice(2) );