const db = require('./db');

const adviceSchema = db.Schema({
    answers:{
        type:[{}]
    },
    licenses:{
        type:[{}]
    }
});

const Advice = db.model('advices', adviceSchema);

module.exports = Advice;