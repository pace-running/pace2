const express = require('express');
const router = express.Router();

const jwtAuth = require('../middleware/auth')
const RaceController = require('../controllers/raceController')


router.get('/', RaceController.get)

router.put('/toggleOpen', jwtAuth,  RaceController.toggleIsOpen)
router.put('/toggleShirtsEnabled', jwtAuth,  RaceController.toggleShirtsEnabled)
router.put('/name', jwtAuth,  RaceController.name)

module.exports = router;
