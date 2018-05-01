const express = require('express');
const router = express.Router();

//

const AdviserController = require('../server/controllers/AdviserController');

// let's define routes

router.get('/',(req,res)=>{

    // here the code goes

    AdviserController.showAdviser(res);

});

module.exports = router;