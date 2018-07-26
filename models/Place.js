const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: false
  },
  img: {
    type: String,
    required: false
  },
  rating: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: false
  },
});

module.exports = Place = mongoose.model('place', PlaceSchema);