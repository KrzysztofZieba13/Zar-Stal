const express = require('express');
const realizationController = require('../controllers/realizationController');

const router = express.Router();

router
  .route('/')
  .post(
    realizationController.uploadRealizationImages,
    realizationController.resizeRealizationImages,
    realizationController.createRealization,
  )
  .get(realizationController.getAllRealizatons);

router
  .route('/realization/:id')
  .get(realizationController.getRealization)
  .patch(realizationController.updateRealization)
  .delete(realizationController.deleteRealization);

module.exports = router;
