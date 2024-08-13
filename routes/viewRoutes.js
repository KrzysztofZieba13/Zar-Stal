const express = require('express');
const viewController = require('../controllers/viewController');

const router = express.Router();

router.get('/', viewController.getOverview);
router.get('/realizacje', viewController.getRealizations);
router.get('/realizacje/realizacja/:id', viewController.getSingleRealization);
router.get(
  '/admin-zar-stal/edycja/strona-glowna-opis',
  viewController.getEditDescPage,
);
router.get(
  '/admin-zar-stal/edycja/strona-glowna-realizacje',
  viewController.getChooseRealizations,
);
router.get(
  '/admin-zar-stal/edycja/strona-glowna-oferta',
  viewController.getEditOffert,
);
router.get(
  '/admin-zar-stal/edycja/strona-glowna-kontakt',
  viewController.getEditContact,
);
router.get(
  '/admin-zar-stal/realizacje/utworz-realizacje',
  viewController.getCreateRealization,
);
router.get(
  '/admin-zar-stal/realizacje/edytuj-realizacje',
  viewController.getEditRealization,
);
router.get(
  '/admin-zar-stal/realizacje/usun-realizacje',
  viewController.getDeleteRealization,
);
router.get(
  '/admin-zar-stal/elementy/utworz-element',
  viewController.getCreateElement,
);
router.get(
  '/admin-zar-stal/elementy/edytuj-element',
  viewController.getEditElement,
);
router.get(
  '/admin-zar-stal/elementy/usun-element',
  viewController.getDeleteElement,
);
router.get('/admin-zar-stal/logowanie', viewController.getLoginPage);
router.get(
  '/admin-zar-stal/zapomnialem-hasla',
  viewController.getForgotPasswordPage,
);
router.get('/admin-zar-stal/nowe-haslo', viewController.getRenewPassword);

module.exports = router;
