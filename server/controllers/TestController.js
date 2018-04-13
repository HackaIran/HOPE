const githubHope = require('github-hope');
const Result = require('../model/Result');

class TestController {

    preInitialTest(repositoryUrl) {

        return new Promise((resolve, reject) => {
            let urlRegex = /^(?:http|https):\/\/github\.com\/([\w-]+?)\/([\w-]+?)(?:\.git|)$/i;

            if (urlRegex.test(repositoryUrl)) {

                let regResult = urlRegex.exec(repositoryUrl);

                let repositoryOwner = regResult[1];

                let repositoryName = regResult[2];

                let uniqueName = repositoryName + "-" + repositoryOwner + "-" + Date.now();

                let newTest = new Result({
                    repositoryUrl,
                    uniqueName
                });

                newTest.save().then((r) => {
                    resolve(r);
                });

            } else {
                // error

                reject(new Error("Url is invalid!"));

            }
        })
    }

    initialTest(uniqueName) {

        return new Promise((resolve, reject) => {

            Result.findOne({
                uniqueName
            }).then((document) => {

                githubHope.evaluate(document.repositoryUrl).then((result) => {

                    Result.findOneAndUpdate({
                        uniqueName
                    }, {
                        mark: result.quality,
                        result: result.results,
                        done: 1
                    }, {
                        new: true
                    }).then((result) => {
                        result = this.calculateProps(result);
                        resolve(result);

                    });

                })

            });

        })

    }

    getTest(uniqueName) {
        return new Promise((resolve,reject)=>{
            Result.findOne({uniqueName}).then((result)=>{
                result = this.calculateProps(result);
                resolve(result);
            }).catch(reject);
        })
        
    }

    calculateProps(result) {
        
        let score = result.mark;

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

        result._doc.scoreText = scoreText;

        result._doc.scoreColor = scoreColor;

        return result._doc;

    }

}

module.exports = TestController;