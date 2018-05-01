const githubHope = require('github-hope');
const Result = require('../model/Result');

class TestController {

    constructor() {
        this.urlRegex = /^(?:http|https):\/\/github\.com\/[\w-.]+?\/[\w-.]+?(?:\.git|)$/i;
    }

    checkUrl(repositoryUrl) {
        if (this.urlRegex.test(repositoryUrl)) {
            return true;
        }
        else {
            return false;
        }
    }

    getRepositoryInfo(repositoryUrl) {

        let rep = {};

        let regResult = this.urlRegex.exec(repositoryUrl);

        rep.owner = regResult[1];

        rep.name = regResult[2];

        return rep;


    }

    test(repositoryUrl) {

        return new Promise((resolve, reject) => {

            if (this.checkUrl(repositoryUrl)) {

                githubHope.evaluate(repositoryUrl).then((result) => {

                    // let's add it to DB

                    let newResult = new Result({
                        repositoryUrl,
                        mark: result.quality,
                        result: result.results
                    });

                    newResult.save().then(() => {

                        result = this.calculateProps(result);

                        resolve(result);

                    });

                }).catch(reject)

            } else {
                // error

                reject(new Error("Url is invalid!"));

            }
        })

    }

    calculateProps(result) {

        let score = result.quality *= 100;

        let scoreText;

        let scoreColor;

        if (score <= 20) {
            scoreText = "Bad";
            scoreColor = "red";
        } else if (score <= 40 && score > 20) {
            scoreText = "Not Bad";
            scoreColor = "lightRed";
        } else if (score <= 60 && score > 40) {
            scoreText = "OK";
            scoreColor = "orange";
        } else if (score > 60 && score <= 80) {
            scoreText = "Good";
            scoreColor = "lightGreen";
        } else {
            scoreText = "Excellent";
            scoreColor = "green";
        }

        result.scoreText = scoreText;

        result.scoreColor = scoreColor;

        return result;

    }

}

module.exports = TestController;