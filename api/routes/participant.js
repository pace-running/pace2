const express = require('express');
const router = express.Router();

const jwtAuth = require('../middleware/auth')

const ParticipantController = require('../controllers/participantController')
const DB = require('../models/index');


router.get('/',jwtAuth, ParticipantController.findAll)

router.put('/update/:id', jwtAuth, ParticipantController.update)

router.post('/markPayed/:id',jwtAuth,ParticipantController.markPayed)

router.put('/register', ParticipantController.register)

module.exports = router;
