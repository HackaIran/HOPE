const express = require('express');

const router = express.Router();

const TestController = require("../server/controllers/TestController");

const AdviserController = require('../server/controllers/AdviserController');

//

const testController = new TestController();

//

router.post('/evaluate',function(req,res,next){

    let repositoryUrl = req.body.repositoryUrl;

    if(repositoryUrl){

        testController.test(repositoryUrl).then((result)=>{
            
            res.send(JSON.stringify(result));

        }).catch(()=>{
            res.send({error:"repository not found!"});
        })

    }else{
        res.status(404).send();
    }

});

router.post('/adviser/advice',(req,res)=>{
    
    let answers = req.body.answers;

    if(answers){
        AdviserController.advice(answers).then((results)=>{
            res.send(JSON.stringify(results));
        })
    }else{
        res.status(404).send();
    }
    
});

module.exports = router;