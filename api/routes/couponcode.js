const express = require('express');
const router = express.Router();

const CouponcodeController = require('../controllers/couponcodeController')

router.get('/', CouponcodeController.get)
router.get('/one/:name', CouponcodeController.getByName)

router.post('/create', CouponcodeController.create)

module.exports = router;
