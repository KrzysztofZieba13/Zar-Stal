const mongoose = require('mongoose');

const elementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Element musi mieć nazwę'],
    trim: true,
  },
  images: [String],
  imagesThumbnails: [String],
  category: {
    type: String,
    required: [true, 'Element musi mieć przypisaną kategorię'],
    enum: {
      values: ['Kontenery', 'Maszyny', 'Elementy'],
      message: `{VALUE} nie jest poprawną wartością`,
    },
  },
});

const Element = mongoose.model('Element', elementSchema);
module.exports = Element;
