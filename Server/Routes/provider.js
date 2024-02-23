const express = require('express')
const router = express.Router() 

const providerController = require('../Controllers/provider')

/* GET: defualt route */
router.get('/', (req, res, next) => {

    providerController.index(req,res,next)
    
})

/* Get: /provider/create => display blank form */
router.get('/create', (req, res, next) => {
    providerController.displayCreateForm(req, res, next) 
})

/* POST: /provider/create => d */
router.post('/create', (req, res, next) =>{
    providerController.createProvider(req, res, next)
})

/* Get: /provider/edit/abc123 => display blank form */
router.get('/edit/:_id', (req, res, next) => {
    providerController.displayEditForm(req, res, next) 
})

/* POST: /provider/edit/abc123 */
router.post('/edit/:_id', (req, res, next) => {

    providerController.updateProvider(req, res, next) 

})

module.exports = router 