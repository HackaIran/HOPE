const express = require('express');
const router = express.Router();

const Result = require("../server/model/Result");

const TestController = require("../server/controllers/TestController");

//

const testController = new TestController();

//

/* GET home page. */
router.get('/', function(req, res, next) {
  
  let pjax = req.get("x-pjax");

  if(pjax){

    res.render('index-partial',{title:'HOPE'});

  }else{

    res.render('index',{title:'HOPE'});

  }
});

router.get('/result/:uniqueName',function(req,res){

  let pjax = req.get("x-pjax");

  if(pjax){

    res.render('result-partial',{title:'HOPE'});

  }else{
    testController.getTest(req.params.uniqueName).then((result)=>{
      res.render('result',{title:'HOPE | '+result.uniqueName,mark:result.mark,data:result});
    }).catch((e)=>{
      console.log(e)
    })

    
  }
  

});


module.exports = router;
