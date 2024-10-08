const express = require('express');
const contactController = require('../controllers/contactController');
const authController = require('../controllers/authController')

const router = express.Router();

router
  .route('/')
  .post(authController.protect, contactController.createContact)
  .patch(authController.protect, contactController.updateContact);

module.exports = router;
