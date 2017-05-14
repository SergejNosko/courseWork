/**
 * Created by Сергей Носко on 08.05.2017.
 */
var Order = require('../models/orderDB').Order,
    async = require('async');

exports.post = function (req, res, next) {
    var id = Math.random(0, 100000),
        date = req.body.date,
        time = req.body.time,
        name = req.body.name,
        telephone = req.body.telephone,
        address = req.body.address,
        comment = req.body.comment,
        totalPrice = parseInt(req.body.totalPrice),
        items = JSON.stringify(req.body.items);
    var order = new Order({id: id, date: date, time: time, name: name, telephone: telephone, address: address, comment: comment, totalPrice: totalPrice, items: items});
    order.save(function (err) {
        if(err) next(err);
        res.send({});
    });

    //console.log(typeof items);
};
