const express = require('express');
const viewController = require('../controllers/viewController');

const router = express.Router();

router.get('/', viewController.getOverview);
router.get('/realizacje', viewController.getRealizations);
router.get('/realizacja/:id', viewController.getSingleRealization);

module.exports = router;
