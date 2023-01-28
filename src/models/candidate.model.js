const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  age: {
    type: Number,
    default: 18,
  },

  township: {
    type: String,
    required: true,
  },

  avatar_url: {
    type: String,
    required: true,
  },

  party: String,
  votes: Number,
});

module.exports = mongoose.model('Candidate', candidateSchema, 'candidates');