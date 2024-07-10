const express = require('express');
const realizationController = require('../controllers/realizationController');

const router = express.Router();

router.post('/', realizationController.createRealization);

module.exports = router;
