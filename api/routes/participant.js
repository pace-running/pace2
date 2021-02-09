const express = require('express');
const router = express.Router();

const multer = require('multer');
var upload = multer({ dest: 'uploads/' })
const jwtAuth = require('../middleware/auth')

const ParticipantController = require('../controllers/participantController')
const FinanceController = require('../controllers/financeController')
const DB = require('../models/index');


router.get('/',jwtAuth, ParticipantController.findAll)

router.put('/update/:id', jwtAuth, ParticipantController.update)

router.post('/markPayed/:id',jwtAuth,ParticipantController.markPayed)

router.put('/register', ParticipantController.register)

router.put('/importPayments', jwtAuth,upload.single('file'), FinanceController.importPayments)


module.exports = router;
