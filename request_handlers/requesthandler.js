var express = require('express');
var router = express.Router();
var indexx = require('../index.js');

exports.landingPage = (req, res) => {

    res.send('hello');

};