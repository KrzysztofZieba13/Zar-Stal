const mongoose = require('mongoose');

const specificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Podaj specyfikację'],
    trim: true,
  },
  value: {
    type: String,
    default: 'b/d',
    trim: true,
  },
  unit: {
    type: String,
    defaulf: '',
    trim: true,
  },
});

const realizationSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: [5, 'Tytuł realizacji musi mieć minimum 5 znaków'],
    maxLength: [55, 'Tytuł realizacji może mieć maksymalnie 55 znaków'],
    trim: true,
    required: [true, 'Realizacja musi posiadać tytuł'],
  },
  description: {
    type: String,
    required: [true, 'Realizacja musi posiadać opis'],
    minLength: [20, 'Opis realizacji musi mieć minimum 20 znaków'],
    maxLength: [300, 'Opis realizacji może mieć maksymalnie 300 znaków'],
    trim: true,
  },
  specifications: {
    type: [specificationSchema],
    default: {},
  },
  primaryImage: {
    type: String,
    required: [true, 'Realizacja musi mieć wybrane zdjęcie główne'],
  },
  primaryImageThumbnail: String,
  images: [String],
  imagesThumbnails: [String],
  location: {
    type: String,
    trim: true,
    required: [true, 'Realizacja musi mieć podaną lokalizację jej budowy'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Realization = mongoose.model('Realization', realizationSchema);
module.exports = Realization;
