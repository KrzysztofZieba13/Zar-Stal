const mongoose = require('mongoose');
const validator = require('validator');
const Contact = require('./contactModel');

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
  mainRealizations: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Realization',
      },
    ],
    validate: {
      validator: function (val) {
        return val.length < 3;
      },
      message: 'Maksymalna liczba realizacji na stronie głównej to 2',
    },
  },
  offert: [
    {
      type: String,
      required: [true, 'Treść oferty jest wymagana.'],
      trim: true,
      minLength: [30, 'Opis oferty jest za krótki, minimum 30 znaków'],
    },
  ],
  contact: Array,
  openHours: [
    {
      dayId: Number,
      open: {
        type: String,
        trim: true,
        validate: {
          validator: function (val) {
            return validator.isTime(val, { mode: 'default' });
          },
          message: 'Podana godzina musi być w formacie hh:mm (12:30)',
        },
      },
      close: {
        type: String,
        trim: true,
        validate: {
          validator: function (val) {
            return validator.isTime(val, { mode: 'default' });
          },
          message: 'Podana godzina musi być w formacie hh:mm (12:30)',
        },
      },
      isClosed: Boolean,
    },
  ],
});

mainPageSchema.pre('save', async function (next) {
  const contactPromise = this.contact.map((id) => Contact.findById(id).exec());
  this.contact = await Promise.all(contactPromise);

  next();
});

const MainPage = mongoose.model('MainPage', mainPageSchema);
module.exports = MainPage;
