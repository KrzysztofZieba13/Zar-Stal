const express = require('express');
const elementController = require('../controllers/elementController');
const authController = require('../controllers/authController')

const router = express.Router();

router
  .route('/')
  .post(
    authController.protect,
    elementController.uploadRealizationImages,
    elementController.resizeElementImages,
    elementController.createElement,
  );

router
  .route('/element/:id')
  .patch(
    authController.protect,
    elementController.uploadRealizationImages,
    elementController.resizeElementImages,
    elementController.updateElement,
  )
  .get(elementController.getElement)
  .delete(authController.protect, elementController.deleteElement);

module.exports = router;
