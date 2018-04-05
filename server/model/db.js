const mongoose = require('mongoose');
const config = require('../../config/config.js')

mongoose.Promise = global.Promise;

mongoose.connect(`${config.db.host}${config.db.dbname}`, { useMongoClient: true });

module.exports = mongoose;