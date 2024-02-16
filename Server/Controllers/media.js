//media model for CRUD
let Media = require('../Models/media') 

let index = async (req, res, next) => {

    //fetch all media docs
    let media = await Media.find()

    console.log(media) 
    res.render('media/index', {
        title: 'Media Library',
        media: media
    })

}

let displayCreateForm = (req, res, next) => {
    res.render('media/create', {title: 'Add New Media'})
}

let createMedia = async(req, res, next) => {

    //save new media to db
    await Media.create(req.body) //includes all form elements 

    //redirect
    res.redirect('/media')

}

//make public 
module.exports = {

    index, displayCreateForm, createMedia

}




