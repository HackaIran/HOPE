const express = require('express');

const router = express.Router();

const TestController = require("../server/controllers/TestController");

//

const testController = new TestController();

//

router.post('/evaluate',function(req,res,next){

    let repositoryUrl = req.body.repositoryUrl;

    if(repositoryUrl){

        testController.test(repositoryUrl).then((result)=>{

            res.send(result);

        })

    }else{
        res.status(404).send();
    }

});

module.exports = router;