const express = require('express')
const router = express.Router() 

const mediaController = require('../Controllers/media')

/* GET: defualt route */

router.get('/', (req, res, next) => {

    mediaController.index(req,res,next)
    
})

module.exports = router 