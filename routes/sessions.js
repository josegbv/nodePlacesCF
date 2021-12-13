var express = require('express');
var router = express.Router();
const sessionController = require('../controllers/sessionControllers')

router.route('/').post(sessionController.authenticate, sessionController.generateToken, sessionController.sendtToken)

module.exports = router;
