const db = require('./db');

const resultSchema = db.Schema({
    repositoryUrl:{
        required: true,
        type: String
    },
    result:{
        type: [],
        required: false
    },
    time:{
        type: Date,
        default: Date.now()
    },
    uniqueName:{
        required:true,
        type:String
    }
});

const Result = db.model('results', sampleSchema);

module.exports = Result;