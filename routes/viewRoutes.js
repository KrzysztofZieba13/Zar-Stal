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

module.exports = router;
