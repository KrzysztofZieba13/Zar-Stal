const express = require('express');
const mainPageController = require('../controllers/mainPageController');

const router = express.Router();

router
  .route('/')
  .get(mainPageController.getMainPage)
  .post(mainPageController.createMainPage)
  .patch(mainPageController.updateMainPage);

router.route('/client-send-email').post(mainPageController.sendHelloWorld);

module.exports = router;
