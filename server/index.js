const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const db = require('../database');
const app = express();


const apiCall = (data, callback) => {
  let startDate = data[0];
  let endDate = data[1];

  axios
  .get(url)
  .then(response => {
    callback(result);
  })
  .catch(error => {
    console.log(error);
  });
}

app.use(express.static(__dirname + '/../client/dist'));

app.get('/api/:dateRange', function (req, res) {

});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
