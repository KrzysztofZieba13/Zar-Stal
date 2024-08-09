const express = require('express');
const elementController = require('../controllers/elementController');

const router = express.Router();

router
  .route('/')
  .post(
    elementController.uploadRealizationImages,
    elementController.resizeElementImages,
    elementController.createElement,
  );

router
  .route('/element/:id')
  .patch(
    elementController.uploadRealizationImages,
    elementController.resizeElementImages,
    elementController.updateElement,
  )
  .get(elementController.getElement)
  .delete(elementController.deleteElement);

module.exports = router;
