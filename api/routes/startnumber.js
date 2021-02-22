const express = require('express');
const router = express.Router();

const ShirtController = require('../controllers/shirtController')

const StartNumberController = require('../controllers/startNumberController')



router.get('/:startnumber', StartNumberController.get)

module.exports = router;
