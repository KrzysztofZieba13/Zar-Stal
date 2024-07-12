const mongoose = require('mongoose');

const specificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Podaj specyfikację'],
      trim: true,
    },
    detail: {
      type: String,
      default: 'b/d',
      trim: true,
    },
  },
  { _id: false },
);

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
  images: [String],
  imagesThumbnails: [String],
  category: [
    {
      type: String,
      required: [true, 'Do realizacji musi być podana jej kategoria'],
      enum: {
        values: ['Hale', 'Elementy', 'Maszyny', 'Kontenery'],
        message: 'Nie ma takiej kategorii: {VALUE}',
      },
    },
  ],
  location: {
    type: String,
    trim: true,
    required: [true, 'Realizacja musi mieć podaną lokalizację jej budowy'],
  },
});

const Realization = mongoose.model('Realization', realizationSchema);
module.exports = Realization;
