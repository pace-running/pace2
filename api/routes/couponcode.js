const express = require('express');
const router = express.Router();

const jwtAuth = require('../middleware/auth')
const CouponcodeController = require('../controllers/couponcodeController')

router.get('/', jwtAuth, CouponcodeController.get)
router.get('/one/:name', CouponcodeController.getByName)

router.put('/create', jwtAuth, CouponcodeController.create)

module.exports = router;
