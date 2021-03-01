const express = require('express');
const router = express.Router();

const multer = require('multer');
var upload = multer({ dest: 'uploads/' })
const jwtAuth = require('../middleware/auth')
const RaceController = require('../controllers/raceController')
const ShirtController = require('../controllers/shirtController')
const FinanceController = require('../controllers/financeController')



router.get('/', RaceController.get)

router.get('/shirts',jwtAuth, ShirtController.stats)
router.get('/shirts/csv',jwtAuth, ShirtController.shirtCSV)
router.put('/shirts/markOrdered',jwtAuth, ShirtController.markShirtsAsOrdered)
router.put('/toggleOpen', jwtAuth,  RaceController.toggleIsOpen)
router.put('/toggleShirtsEnabled', jwtAuth,  RaceController.toggleShirtsEnabled)
router.put('/name', jwtAuth,  RaceController.name)
router.put('/importPayments', jwtAuth,upload.single('file'), FinanceController.importPayments)
router.get('/financeStats', jwtAuth,upload.single('file'), FinanceController.stats)
router.get('/csv', jwtAuth,upload.single('file'), FinanceController.csv)
module.exports = router;
