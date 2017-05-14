/*var Order = require('../models/orderDB').Order;

var order = Order.find(function (err, elements) {
    console.log(elements);
});*/
var MongoClient = require('mongodb').MongoClient;

module.exports = function(app){
    app.get('/', function (req, res) {
        MongoClient.connect('mongodb://127.0.0.1:27017/courseWork', function(err, db) {
            if (err) {
                throw err;
            }
            db.collection('elements').find().toArray(function(err, result) {
                if (err) {
                    throw err;
                }
                console.log(result);
                res.render("index", {
                    elements: result
                });
            });
        });
    });
    app.post('/sendOrder', require('./sendOrder').post);
};