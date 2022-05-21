const express = require('express');
const router = express.Router();

const jwtAuth = require('../middleware/auth')

const ParticipantController = require('../controllers/participantController')


router.get('/',jwtAuth, ParticipantController.findAll)

router.put('/update/:id', jwtAuth, ParticipantController.update)

router.post('/markPayed/:id',jwtAuth,ParticipantController.markPayed)

router.post('/resendconfirmation/:id',jwtAuth,ParticipantController.resendConfirmation)

router.post('/createEmpty/:amount',jwtAuth,ParticipantController.createEmpty)

router.post('/setonsite/:token', ParticipantController.setOnsite)

router.put('/register', ParticipantController.register)

router.get('/byToken/:token', ParticipantController.byToken)

module.exports = router;
