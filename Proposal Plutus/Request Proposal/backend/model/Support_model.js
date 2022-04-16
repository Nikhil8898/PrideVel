const mongoose = require("mongoose");
const con = require('../database');

var Schema = mongoose.Schema;
//creating a Schema
var supportSchema =   new Schema({
    Category: String,
    Title : String,
    WalletID : String,
    Description: String,
    Status : String,
    Date: Date
})

supportSchema.index({Description: 'text', Title:'text'},{
    weights: {
    Description: 5,
    Title:10
    } 
    } );

//exporting the model
var supportModel = mongoose.model('Support_Request',supportSchema);

module.exports = supportModel;