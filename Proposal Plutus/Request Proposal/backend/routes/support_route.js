const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {insertDetails,fetchDetails, walletTicket,filterCategory} = require('../controllers/support_Controller');
//const {insertDetails} = require('../controllers/support_Controller');

const supportModel = require('../model/Support_model');
 
 
/* GET home page. */
router.post('/insert/', insertDetails);
router.post('/fetch/', fetchDetails);
module.exports = router;