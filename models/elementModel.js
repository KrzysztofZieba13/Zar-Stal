const mongoose = require('mongoose');

const elementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Element musi mieć nazwę'],
    trim: true,
  },
  images: [String],
  category: {
    type: String,
    required: [true, 'Element musi mieć przypisaną kategorię'],
  },
});

const Element = mongoose.model('Element', elementSchema);
module.exports = Element;
