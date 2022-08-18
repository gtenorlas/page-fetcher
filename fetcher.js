const request = require('request');
const fs = require('fs');


const args = process.argv.slice(2);



const makeRequest = (address, callback) => {

  request(address, function(error, response, body) {
    //console.error('error:', error); // Print the error if one occurred
    //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //console.log('body:', body); // Print the HTML for the Google homepage.
    if (!error) {
      return callback(args[1], body);
    }
  });
};

const saveFile = (file, body) => {
  fs.writeFile(file, body, err => {
    if (err) {
      console.error(err);
    }
    //get file size
    const stats = fs.statSync(file);
    const fileSizeInBytes = stats.size;
    console.log(`Downloaded and saved ${fileSizeInBytes} bytes to ${file}`);
  });
};

makeRequest(args[0], saveFile);

