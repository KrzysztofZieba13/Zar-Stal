const express = require('express');
const mainPageController = require('../controllers/mainPageController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(mainPageController.getMainPage)
  .post(authController.protect, mainPageController.createMainPage)
  .patch(authController.protect, mainPageController.updateMainPage);

router.route('/client-send-email').post(mainPageController.sendHelloWorld);

module.exports = router;
