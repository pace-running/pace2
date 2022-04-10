const express = require('express');
const router = express.Router();

const jwtAuth = require("../middleware/auth");
const StartNumberController = require('../controllers/startNumberController')
const ShirtController = require("../controllers/shirtController");



router.get('/:startnumber/:token', StartNumberController.get)

router.post('/generate-zip', jwtAuth, StartNumberController.onSiteZip)
router.get('/zip', StartNumberController.onSiteZipDownload)

module.exports = router;
