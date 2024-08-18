const express = require('express');
// const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.patch(
  '/change-password',
  authController.protect,
  authController.updatePassword,
);

router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);

module.exports = router;
