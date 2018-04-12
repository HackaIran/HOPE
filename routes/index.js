const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HOPE' });
});

router.get('/result/:uniqueName',function(req,res){

  let pjax = req.get("x-pjax");

  if(pjax){
    res.render('result-partial',{title:'HOPE'});
  }else{
    res.render('result',{title:'HOPE'});
  }
  

});


module.exports = router;
