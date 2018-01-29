const rp = require('request-promise');
const cheerio = require('cheerio');
const async = require('async');

const mongoose = require('./config/mongoose');
const db = mongoose();

const mushrooms = [];

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

            latinName.forEach((name,i) => {
                mushrooms.push({
                    name: {
                        latin: name,
                        alternatives: commonName[i]
                    },
                    quality: quality[i]
                });
            });

            callback();
        })
        .catch((err) => {
            console.log('Error getting URL body: ', err);
            callback(err);
        });
}, function (err) {
    if (err) console.error(err.message);
    console.log('MUSHROOMS: ', mushrooms);
});
