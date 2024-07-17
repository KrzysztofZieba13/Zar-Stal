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
  .patch(
    realizationController.uploadRealizationImages,
    realizationController.resizeRealizationImages,
    realizationController.updateRealization,
  )
  .delete(realizationController.deleteRealization);

router.patch(
  '/realization/:id/delete-images',
  realizationController.deleteImages,
);

router.patch(
  '/realization/:id/delete-specification',
  realizationController.deleteSpecification,
);

module.exports = router;
