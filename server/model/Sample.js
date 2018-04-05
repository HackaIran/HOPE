const db = require('./db');

const sampleSchema = db.Schema({
    username: String,
    password: String
});

const Sample = db.model('Sample', sampleSchema);

module.exports = Sample;