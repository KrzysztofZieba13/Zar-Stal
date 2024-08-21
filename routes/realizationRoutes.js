const express = require('express');
const realizationController = require('../controllers/realizationController');
const authController = require('../controllers/authController')

const router = express.Router();

router
  .route('/')
  .post(
    authController.protect,
    realizationController.uploadRealizationImages,
    realizationController.resizeRealizationImages,
    realizationController.createRealization,
  )
  .get(realizationController.getAllRealizatons);

router
  .route('/realization/:id')
  .get(realizationController.getRealization)
  .patch(
    authController.protect,
    realizationController.uploadRealizationImages,
    realizationController.resizeRealizationImages,
    realizationController.updateRealization,
  )
  .delete(authController.protect, realizationController.deleteRealization);

router.patch(
  '/realization/:id/delete-images', authController.protect,
  realizationController.deleteImages,
);

router.patch(
  '/realization/:id/delete-specification', authController.protect,
  realizationController.deleteSpecification,
);

module.exports = router;
