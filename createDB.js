/**
 * Created by Сергей Носко on 08.05.2017.
 */
var async = require('async'),
    mongoose = require('./libs/mongoose');
mongoose.set('debug', true); // показывает полный список действий mongoose

async.series([   //последовательное выполнение ф-ций
    open,
    dropDatabase,
    requireModels,
    createElements
], function (err, results) {
    console.log(arguments);
    mongoose.disconnect();
});

function open(callback) {
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function requireModels(callback) {
    require('./models/orderDB');

    async.each(Object.keys(mongoose.models), function (modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}

function createElements(callback) {

    var elements = [
        {
            name: 'Папперони',
            price: 120
        },
        {
            name: 'Неаполитана',
            price: 150
        },
        {
            name: 'Тропикана',
            price: 130
        }
    ];
    async.each(elements, function (elementData, callback) {
        var element = new mongoose.models.Element(elementData);
        element.save(callback);
    }, callback);
}

