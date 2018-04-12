const db = require('./db');

const resultSchema = db.Schema({
    repositoryUrl:{
        required: true,
        type: String
    },
    mark:{
        type:Number,
        default:-1,
        required:true
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
    },
    done:{
        type: Number,
        default: 0
    }
});

const Result = db.model('results', resultSchema);

module.exports = Result;