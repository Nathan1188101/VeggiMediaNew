const express = require('express')
const router = express.Router() 

//global auth check middleware we built
let authCheck = require('../Config/authCheck')
const mediaController = require('../Controllers/media')

/* GET: defualt route */
router.get('/', (req, res, next) => {

    mediaController.index(req,res,next)
    
})

/* Get: /media/create => display blank form */
router.get('/create', authCheck, (req, res, next) => {
    mediaController.displayCreateForm(req, res, next) 
})

/* Get: /media/edit/abc123 => display blank form */
router.get('/edit/:_id', authCheck, (req, res, next) => {
    mediaController.displayEditForm(req, res, next) 
})

/* POST: /media/create => d */
router.post('/create', authCheck, (req, res, next) =>{
    mediaController.createMedia(req, res, next)
})

/* GET: /media/delete/abc123 =>   */
router.get('/delete/:_id', authCheck, (req, res, next) => {
    mediaController.deleteMedia(req, res, next) 
})

/* POST: /media/edit/abc123 */
router.post('/edit/:_id', authCheck, (req, res, next) => {

    mediaController.updateMedia(req, res, next) 

})

module.exports = router 