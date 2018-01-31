const rp = require('request-promise');
const cheerio = require('cheerio');
const async = require('async');

const mongoose = require('./config/mongoose');
const db = mongoose.connect();

const mushroomModel = require('./models/mushroom');

var mushrooms = [];
var indexes = [];
for (indexPage=0; indexPage <= 520; indexPage+=20) {
    indexes.push(indexPage);
}

async.eachOfSeries(indexes, function (value, key, callback) {

    console.log('Analysis of index: ', value);

    const options = {
        uri: 'https://www.fungipedia.org/hongos.html?start='+value,
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    rp(options)
        .then(($) => {
            var latinName = [];
            $('.catItemTitle').each(function(i, elem) {
                latinName.push($(this).text().trim());
            });

            var commonName = [];
            $('.catItemHeaderFungi').each(function(i, elem) {
                var info = $(this).text().split("\n");
                info.forEach(part => {
                    if (part.indexOf('Nombre com') !== -1) {
                        var names = part.split(':')[1];
                        var commonNames = [];
                        names.split(', ').forEach(name => {
                            commonNames.push(name.trim().replace('.',''));
                        });
                        commonName.push(commonNames);
                    }
                });
            });

            var quality = [];
            $('.comest').each(function(i,elem) {
                quality.push($(this).attr('title').split('-')[1].trim());
            });

            async.forEachOf(latinName, function (value, key, cb) {
                try {
                    var mushroom = {
                        name: {
                            latin: value,
                            alt: commonName[key]
                        },
                        quality: quality[key]
                    };
                    mushroomModel.create(mushroom, (err, mushroomSaved) => {
                        if (err) { console.error('Error saving mushroom: ', mushroom); }
                        mushrooms.push(mushroom); cb();
                    });
                } catch (err) {
                    cb(err);
                }
            }, function (err) {
                if (err) console.error('Error saving mushrooms: ', err);
                callback(err);
            });
        })
        .catch((err) => {
            console.log('Error getting URL body: ', err);
            callback(err);
        });
}, function (err) {
    if (err)console.error('Error', err);
    else console.log('Mushrooms loaded succesfully: ' + mushrooms.length);
    mongoose.close();
});
