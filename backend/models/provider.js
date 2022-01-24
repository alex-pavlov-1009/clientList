const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const providerScheme = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Provider', providerScheme);
