/**
 * Created by Сергей Носко on 03.05.2017.
 */
var crypto = require('crypto');
var async = require('async');
var util = require('util');

var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;

var order = new Schema({
    id : {
        type : Number,
        unique: true,
        required : true
    },
    date : {
        type : String,
        required : true
    },
    time : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    telephone : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    comment : {
        type : String,
        default : ''
    },
    totalPrice : {
        type: String,
        required: true
    },
    items : {
        type : String,
        required : true
    }
});
var orderElement = new Schema({
    id : {
        type : Number,
        unique: true,
        required : true
    },
    name : {
        type : String,
        unique: true,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    imgSrc : {
        type: String,
        required: true
    },
    description : {
        type: String
    },
    condition : {
        type: String
    }
});
orderElement.statics.findAllElements = function(){
    return this.find();
};
exports.Order = mongoose.model('Order', order);
exports.Element = mongoose.model('Element', orderElement);