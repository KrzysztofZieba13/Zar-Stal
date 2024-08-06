const mongoose = require('mongoose');
const validator = require('validator');

const contactSchema = new mongoose.Schema({
  ownerNumber: {
    type: String,
    trim: true,
    validate: [validator.isMobilePhone, 'Wprowadź poprawny numer telefonu'],
  },
  productionNumber: {
    type: String,
    trim: true,
    validate: [validator.isMobilePhone, 'Wprowadź poprawny numer telefonu'],
  },
  secretariatNumber: {
    type: String,
    trim: true,
    validate: [validator.isMobilePhone, 'Wprowadź poprawny numer telefonu'],
  },
  email: {
    type: String,
    validate: [validator.isEmail, 'Wprowadź poprawny adres email'],
  },
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
