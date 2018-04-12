const db = require('./db');

const resultSchema = db.Schema({
    repositoryUrl: {
        required: true,
        type: String
    },
    mark: {
        type: Number,
        default: -1,
        required: true
    },
    result: {
        type: [],
        required: false
    },
    time: {
        type: Date,
        default: Date.now()
    },
    uniqueName: {
        required: true,
        type: String
    },
    done: {
        type: Number,
        default: 0
    }
});

/**
 * 
 * @description for calculating score text and color
 * 
 */

resultSchema.statics.calculateScoreProps = function (result) {
    
    let score = result.mark;

    let scoreText;

    let scoreColor;

    if (score <= 20) {
        scoreText = "Try a Little More;)";
        scoreColor = "red";
    } else if (score <= 40 && score > 20) {
        scoreText = "I'm Sure That You Can Do Better;)";
        scoreColor = "lightRed";
    } else if (score <= 60 && score > 40) {
        scoreText = "Good But it Can Become Better";
        scoreColor = "orange";
    } else if (score > 60 && score <= 80) {
        scoreText = "Very Good:)";
        scoreColor = "lightGreen";
    } else {
        scoreText = "Excellent!";
        scoreColor = "green";
    }

    result.scoreColor = scoreColor;

    result.scoreText = scoreText;

    return result;

}

const Result = db.model('results', resultSchema);

module.exports = Result;