const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/', viewController.getOverview);
router.get('/realizacje', viewController.getRealizations);
router.get('/realizacje/realizacja/:id', viewController.getSingleRealization);

router.get(
  '/admin-zar-stal/edycja/strona-glowna-opis',
  authController.protect,
  viewController.getEditDescPage,
);
router.get(
  '/admin-zar-stal/edycja/strona-glowna-realizacje',
  authController.protect,
  viewController.getChooseRealizations,
);
router.get(
  '/admin-zar-stal/edycja/strona-glowna-oferta',
  authController.protect,
  viewController.getEditOffert,
);
router.get(
  '/admin-zar-stal/edycja/strona-glowna-kontakt',
  authController.protect,
  viewController.getEditContact,
);
router.get(
  '/admin-zar-stal/realizacje/utworz-realizacje',
  authController.protect,
  viewController.getCreateRealization,
);
router.get(
  '/admin-zar-stal/realizacje/edytuj-realizacje',
  authController.protect,
  viewController.getEditRealization,
);
router.get(
  '/admin-zar-stal/realizacje/usun-realizacje',
  authController.protect,
  viewController.getDeleteRealization,
);
router.get(
  '/admin-zar-stal/elementy/utworz-element',
  authController.protect,
  viewController.getCreateElement,
);
router.get(
  '/admin-zar-stal/elementy/edytuj-element',
  authController.protect,
  viewController.getEditElement,
);
router.get(
  '/admin-zar-stal/elementy/usun-element',
  authController.protect,
  viewController.getDeleteElement,
);
router.get('/logowanie', viewController.getLoginPage);
router.get(
  '/admin-zar-stal/zapomnialem-hasla',
  viewController.getForgotPasswordPage,
);
router.get('/nowe-haslo/:token', viewController.getRenewPassword);
router.get(
  '/admin-zar-stal/zmiana-hasla',
  authController.protect,
  viewController.getChangePassword,
);

module.exports = router;
