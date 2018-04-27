const express = require('express');
const router = express.Router();

// let's define routes

router.get('/',(req,res)=>{

    // here the code goes

    res.render('adviser/index');

});

module.exports = router;