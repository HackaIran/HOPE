const githubHope = require('github-hope');
const Result = require('../model/Result');

class TestController {

    preInitialTest(repositoryUrl) {

        return new Promise((resolve,reject)=>{
            let urlRegex = /^(?:http|https):\/\/github\.com\/([\w-]+?)\/([\w-]+?)(?:\.git|)$/i;

            if (urlRegex.test(repositoryUrl)) {
    
                let regResult = urlRegex.exec(repositoryUrl);
    
                let repositoryOwner = regResult[1];
    
                let repositoryName = regResult[2];
    
                let uniqueName = repositoryName+"-"+repositoryOwner+"-"+Date.now();
    
                let newTest = new Result({
                    repositoryUrl,
                    uniqueName
                });
    
                newTest.save().then((r)=>{
                    resolve(r);
                });
    
            }else{
                // error
    
                reject(new Error("Url is invalid!"));
    
            }
        })
    }

    initialTest(uniqueName){

        return new Promise((resolve,reject)=>{

            Result.findOne({uniqueName}).then((document)=>{

                githubHope.evaluate(document.repositoryUrl).then((result)=>{

                    Result.update({uniqueName},{mark:result.quality,result:result.results}).then(()=>{

                        resolve(result);

                    });

                })

            });

        })

    }

}

module.exports = TestController;