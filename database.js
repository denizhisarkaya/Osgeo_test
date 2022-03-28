const promise = require('bluebird');
const CONFIG = require('./appConfig');

const pgp = require('pg-promise')(options);
// Veritabanaı bağlantısı
const config = {
    connectionString: CONFIG.connectionString,
    max: 30,
    ssl: {rejectUnauthorized: false}
};
let DATABASE_PGB = pgp(config);

module.exports = {
       getAllLocations: getAllLocations
};

var options = {
    promiseLib: promise
};

function getAllLocations(cb) {
      DATABASE_PGB.any('SELECT ST_X(loc) as longitude, ST_Y(loc) as latitude from buildings')
      .then(function (data) {
         cb(null, data);})
       .catch(function (err) {
          cb(err)});
}