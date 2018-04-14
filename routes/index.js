const express = require('express');
const router = express.Router();

const Result = require("../server/model/Result");

const TestController = require("../server/controllers/TestController");

//

const testController = new TestController();

//

/* GET home page. */
router.get('/', function (req, res, next) {

  let pjax = req.get("x-pjax");

  if (pjax) {

    res.render('index-partial', {
      title: 'HOPE'
    });

  } else {

    res.render('index', {
      title: 'HOPE'
    });

  }
});

router.get('/evaluate', function (req, res) {

  // check if url is set

  if (!req.query.url) {
    res.status(404).send();
  }

  let pjax = req.get("x-pjax");

  if (pjax) {

    res.render('result-partial');

  } else {

    let rep = testController.getRepositoryInfo(req.query.url);
    
    res.render('result',{title:"HOPE | Result of " + rep.name});

  }


});


module.exports = router;