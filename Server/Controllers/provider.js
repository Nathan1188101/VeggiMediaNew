//provider model for CRUD
let Provider = require('../Models/provider') 

let index = async (req, res, next) => {

    //fetch all providers
    let provider = await Provider.find()

    console.log(provider) 
    res.render('providers/index', {
        title: 'Providers',
        provider: provider
    })

}

let displayCreateForm = (req, res, next) => {
    res.render('providers/create', {title: 'Add Provider'})
}

let createProvider = async(req, res, next) => {

    //save new provider to db
    await Provider.create(req.body) //includes all form elements 

    //redirect
    res.redirect('/providers')

}

let displayEditForm = async(req, res, next) => {

    let provider = await Provider.findById(req.params._id)

    res.render('providers/edit', {
        title: 'Update',
        provider: provider
    })

}

let updateProvider = async(req, res, next) => {
    await Provider.findByIdAndUpdate(req.params._id, req.body)
    res.redirect('/providers')
}


module.exports = {

    index,
    displayCreateForm,
    createProvider,
    displayEditForm,
    updateProvider

}
