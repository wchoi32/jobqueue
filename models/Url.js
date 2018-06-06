const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UrlSchema = new Schema({
  url_id: String,
  url_address: String,
  url_html: String
});

module.exports = Url = mongoose.model('url', UrlSchema);