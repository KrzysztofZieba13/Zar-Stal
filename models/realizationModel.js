const mongoose = require('mongoose');

const realizationSchema = new mongoose.Schema({
  title: String,
});

const Realization = mongoose.model('Realization', realizationSchema);
module.exports = Realization;
