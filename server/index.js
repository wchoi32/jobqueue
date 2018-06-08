const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const axios = require('axios');
const async = require('async');

const Url = require('../models/Url');

const app = express();

const jobQueue = async.queue((task, callback) => {
  console.log('Performing task: ' + task.name);
  console.log('Waiting to be processed: ', jobQueue.length());
  console.log('----------------------------------');

  // Used setTimeout to simulate more 'Intensive task'
  // In real scenario, use without setTimeout and for simple
  // task, can run more than one task at a time

  setTimeout(function () {
    axios.get(task.url)
      .then((res) => {
        Url.findOneAndUpdate(
          { url_address: task.url },
          { $set: { url_html: res.data } }, (err) => {
            if (err) console.log(err);
          }
        )
      })
      .catch((err) => {
        if (err) {
          Url.findOneAndUpdate(
            { url_address: task.url },
            { $set: { url_html: 'FAILED TO FETCH URL' } }, (err) => {
              if (err) console.log(err);
            }
          )
        }
      });

    callback();
  }, 20000);
}, 1);

jobQueue.drain = function () {
  console.log('all items have been processed.');
};

app.use(bodyParser.json());

mongoose
  .connect('mongodb://localhost/jobqueue')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(express.static(__dirname + '/../client/dist'));

app.post('/convertUrl', (req, res) => {
  let tempUrl = req.body.data;

  if (req.body.data.substr(0, 7) !== 'http://') {
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

        jobQueue.push({ name: newId, url: tempUrl }, (err) => {
          if (err) res.json('Invalid URL');
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


  // If we want to check status from Job Queue Directly:

  // const jobTask = jobQueue._tasks.toArray();

  // jobTask.forEach((jobId) => {
  //   if (jobId.name === req.params.job_id) {
  //     return res.json('Job ID in Progress');
  //   }
  // })
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));