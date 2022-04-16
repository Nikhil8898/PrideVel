const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {fetchDetails} = require('../controllers/tokenController');
const tokenModel = require('../model/tokenModel');
 
 
/* GET home page. */
router.get('/fetch/', fetchDetails);
module.exports = router;