var express = require('express');
var router = express.Router();
const usersControllers = require('../controllers/userControllers')
const sessionController = require('../controllers/sessionControllers')

router.route('/').get(usersControllers.get)
.post(usersControllers.create, sessionController.generateToken, sessionController.sendtToken);


module.exports = router;
