const mongoose = require("mongoose");
//const con = require('../database');

var Schema = mongoose.Schema;
//creating a Schema
tokenSchema = new mongoose.Schema({
    coinid: {
        type: String,     
    },
    name: {
        type: String,
    },
    symbol: {
        type: String,   
    },
    platform: {
        type: Object,
    },
    image: {
        type: Object,
    },
    price: {
        type: Number,
    }
   
});
const token = mongoose.model('CoinInfo', tokenSchema);


module.exports = token;