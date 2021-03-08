const express = require('express');
const router = express.Router();

const StartNumberController = require('../controllers/startNumberController')



router.get('/:startnumber/:token', StartNumberController.get)

module.exports = router;
