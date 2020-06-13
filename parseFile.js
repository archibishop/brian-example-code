const xml2js = require('xml2js');
var parser = new xml2js.Parser();


function parseFile(data) {
    return new Promise((resolve, reject) => {
        parser.parseString(data, function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}

module.exports = {
    parseFile
}