const githubHope = require('github-hope');
const Result = require('../model/Result');

class TestController {

    test(repositoryUrl){

        return new Promise((resolve, reject) => {
            let urlRegex = /^(?:http|https):\/\/github\.com\/([\w-]+?)\/([\w-]+?)(?:\.git|)$/i;

            if (urlRegex.test(repositoryUrl)) {

                let regResult = urlRegex.exec(repositoryUrl);

                let repositoryOwner = regResult[1];

                let repositoryName = regResult[2];

                githubHope.evaluate(repositoryUrl).then((result)=>{

                    // let's add it to DB

                    let newResult = new Result({
                        repositoryUrl,
                        mark: result.quality,
                        result: result.result
                    });

                    newResult.save().then(()=>{

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

        result.scoreText = scoreText;

        result.scoreColor = scoreColor;

        return result;

    }

}

module.exports = TestController;