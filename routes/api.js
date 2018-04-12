const express = require('express');
const router = express.Router();

const TestController = require("../server/controllers/TestController");

const testController = new TestController();

router.post('/preInitialTest',function(req,res,next){

    let repositoryUrl = req.body.repositoryUrl;

    if(repositoryUrl){

        testController.preInitialTest(repositoryUrl).then((r)=>{

            res.send({uniqueName:r.uniqueName});

        })

    }else{
        res.status(404).send();
    }

});

router.post("/initiateTest",function(req,res){

    let uniqueName = req.body.uniqueName;
    
    if(uniqueName){

        testController.initialTest(uniqueName).then((result)=>{
            res.send(result);
        })

    }else{
        res.status(404).send();
    }

});

module.exports = router;