const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clientScheme = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  providers: {
    type: [Schema.Types.ObjectId],
    ref: 'Providers',
  },
});

module.exports = mongoose.model('Client', clientScheme);
