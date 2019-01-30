var express = require('express');
var router = express.Router();
var request = require('../request_handlers/requesthandler.js');

router.get('/', request.landingPage);

module.exports = router;