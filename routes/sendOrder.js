/**
 * Created by Сергей Носко on 08.05.2017.
 */
var Order = require('../models/orderDB').Order,
    async = require('async');

exports.post = function (req, res, next) {
    var date = req.body.date,
        time = req.body.time,
        name = req.body.name,
        telephone = req.body.telephone,
        address = req.body.address,
        comment = req.body.comment,
        condition;
    console.log(req.body);
};
