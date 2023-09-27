

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  no_of_pages: {
    type: Number,
    required: true,
  },
  published_at: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Book', bookSchema);
