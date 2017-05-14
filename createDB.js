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
            id: 11,
            name: 'Неаполитана',
            price: 120,
            imgSrc: "/images/neapolitana.png",
            description: "Манящая, свежая, аппетитная классическая Неаполитана скрасит любой вечер в любой компании.",
            condition: "сыр, грибы, чеснок, острый перец, еще длинное наименование"
        },
        {
            id: 12,
            name: 'Папперони',
            price: 150,
            imgSrc: "/images/pepperony.png",
            description: "Манящая, свежая, аппетитная классическая Папперони скрасит любой вечер в любой компании.",
            condition: "сыр, грибы, чеснок, острый перец, еще длинное наименование"
        },
        {
            id: 13,
            name: 'Тропикана',
            price: 130,
            imgSrc: "/images/tropicana.png",
            description: "Манящая, свежая, аппетитная классическая Тропикана скрасит любой вечер в любой компании.",
            condition: " сыр, грибы, чеснок, острый перец, еще длинное наименование"
        },
        {
            id: 21,
            name: 'Салат Греческий',
            price: 25,
            imgSrc: "/images/salat1.jpg",
            description: "Лучшее дополнение к любому столу из свежих овощей",
            condition: "сыр, грибы, чеснок, острый перец, еще длинное наименование"
        },
        {
            id: 22,
            name: 'Салат Монтекристо',
            price: 25,
            imgSrc: "/images/salat2.jpg",
            description: "Лучшее дополнение к любому столу из свежих овощей",
            condition: "сыр, грибы, чеснок, острый перец, еще длинное наименование"
        },
        {
            id: 23,
            name: 'Салат Оливье',
            price: 25,
            imgSrc: "/images/salat3.jpg",
            description: "Лучшее дополнение к любому столу из свежих овощей",
            condition: "сыр, грибы, чеснок, острый перец, еще длинное наименование"
        },
        {
            id: 31,
            name: 'Кока-Кола',
            price: 20,
            imgSrc: "/images/cocacola.png"
        },
        {
            id: 32,
            name: 'Швепс',
            price: 20,
            imgSrc: "/images/schweppes.png"
        },
        {
            id: 33,
            name: 'Спрайт',
            price: 20,
            imgSrc: "/images/sprite.png"
        }

    ];
    async.each(elements, function (elementData, callback) {
        var element = new mongoose.models.Element(elementData);
        element.save(callback);
    }, callback);
}

