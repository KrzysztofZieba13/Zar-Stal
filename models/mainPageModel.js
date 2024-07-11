const mongoose = require('mongoose');
const validator = require('validator');

const mainPageSchema = new mongoose.Schema({
  pageDescription: {
    type: String,
    trim: true,
    minLength: [
      150,
      'Za krótki opis! Opis firmy musi mieć minimum 150 znaków.',
    ],
    maxLength: [
      300,
      'Za długi opis! Opis firmy może mieć maksymalnie 300 znaków.',
    ],
    required: [true, 'Krótki opis firmy jest wymagany.'],
  },
  mainRealizations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Realization',
    },
  ],
  offert: [
    {
      type: String,
      required: [true, 'Treść oferty jest wymagana.'],
      trim: true,
      minLength: [30, 'Opis oferty jest za krótki, minimum 30 znaków'],
    },
  ],
  telephoneNumbers: [
    {
      type: String,
      validate: [validator.isMobilePhone, 'Wprowadź poprawny numer telefonu'],
    },
  ],
  email: [
    {
      type: String,
      validate: [validator.isEmail, 'Wprowadź poprawny adress Email'],
    },
  ],
  openHours: [
    {
      dayId: Number,
      open: Number,
      close: Number,
      isClosed: Boolean,
    },
  ],
});

const MainPage = mongoose.model('MainPage', mainPageSchema);
module.exports = MainPage;
