const express = require('express');
const router = express.Router();

const jwtAuth = require('../middleware/auth')
const RaceController = require('../controllers/raceController')
const ShirtController = require('../controllers/shirtController')



router.get('/', RaceController.get)

router.get('/shirts',jwtAuth, ShirtController.stats)
router.get('/shirts/csv',jwtAuth, ShirtController.shirtCSV)
router.put('/toggleOpen', jwtAuth,  RaceController.toggleIsOpen)
router.put('/toggleShirtsEnabled', jwtAuth,  RaceController.toggleShirtsEnabled)
router.put('/name', jwtAuth,  RaceController.name)

module.exports = router;
