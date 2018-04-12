const express = require('express');
const router = express.Router();

const Result = require("../server/model/Result");

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

    Result.findOne({uniqueName:req.params.uniqueName}).then((result)=>{

      result = Result.calculateScoreProps(result);
      // delete unnecessary props
      delete result._id;
      delete result._v;

      res.render('result',{title:'HOPE | '+result.uniqueName,mark:result.mark,data:result});

    })

    
  }
  

});


module.exports = router;
