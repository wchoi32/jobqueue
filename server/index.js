const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const axios = require('axios');

const Url = require('../models/Url');

const app = express();

app.use(bodyParser.json());

mongoose
  .connect('mongodb://localhost/jobqueue')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(express.static(__dirname + '/../client/dist'));

app.post('/convertUrl', (req, res) => {
  let tempUrl = req.body.data;

  if (tempUrl.substr(0, 7) !== 'http://') {
    tempUrl = 'http://' + tempUrl;
  }

  Url.findOne({ url_address: tempUrl })
    .then(url => {
      if (url) {
        res.json(url.url_id + ' Submitted before, check status below');
      } else {
        const newId = shortid.generate();
        const newUrl = new Url({
          url_id: newId,
          url_address: tempUrl,
          url_html: null
        });

        newUrl
          .save()
          .then(url => {
            res.json(url.url_id);
          });

        axios.get(tempUrl)
          .then((res) => {
            Url.findOneAndUpdate(
              { url_address: tempUrl },
              { $set: { url_html: res.data } }, (err) => {
                if (err) console.log(err);
              }
            )
          })
          .catch((error) => {
            res.json('Invalid URL, PLEASE ADD http://');
          });
      }
    });
});

app.get('/job/:job_id', (req, res) => {
  Url.findOne({ url_id: req.params.job_id })
    .then(url => {
      if (!url) {
        return res.json('This ID is invalid');
      }

      if (url.url_html === null) {
        return res.json('Job ID in Progress');
      }

      return res.json(url.url_html);
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));