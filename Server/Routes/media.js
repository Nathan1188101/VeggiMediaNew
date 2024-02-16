const express = require('express')
const router = express.Router() 

const mediaController = require('../Controllers/media')

/* GET: defualt route */

router.get('/', (req, res, next) => {

    mediaController.index(req,res,next)
    
})

/* Get: /media/create => display blank form */
router.get('/create', (req, res, next) => {
    mediaController.displayCreateForm(req, res, next) 
})

/* POST: /media/ */
router.post('/create', (req, res, next) =>{
    mediaController.createMedia(req, res, next)
})


module.exports = router 