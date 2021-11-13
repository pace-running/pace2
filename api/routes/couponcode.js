const express = require('express');
const router = express.Router();

const CouponcodeController = require('../controllers/couponcodeController')

router.get('/', CouponcodeController.get)

module.exports = router;
