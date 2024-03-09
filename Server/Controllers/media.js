//media model for CRUD
let Media = require('../Models/media') 
let Provider = require('../Models/provider')

let index = async (req, res, next) => {

    //fetch all media docs
    let media = await Media.find()

    console.log(media) 
    console.log("User:", req.user)
    res.render('media/index', {
        title: 'Media Library',
        media: media,
        user: req.user
    })

}

let displayCreateForm = async(req, res, next) => {

    //let provider = await Provider.findById(req.params._id)
    let provider = await Provider.find()

    console.log(provider)
    res.render('media/create', 
    {title: 'Add New Media',
    provider: provider,
    user: req.user})
}

let createMedia = async(req, res, next) => {

    //save new media to db
    await Media.create(req.body) //includes all form elements 

    //redirect
    res.redirect('/media')

}

let deleteMedia = async(req, res , next) => {

    //for if statement below 
    let media = await Media.findById(req.params._id)

    if(req.user.username != media.username){
        return res.redirect('/auth/unauthorized')
    }
    else{
          //remove selected doc
        await Media.findByIdAndDelete(req.params._id); //need await because it needs a change to actually do it (bad explanation will come back)
    }

    //redirect
    res.redirect('/media')
}

let displayEditForm = async(req, res, next) => {

    let media = await Media.findById(req.params._id)
    let provider = await Provider.find()

    if(req.user.username != media.username){
        return res.redirect('/auth/unauthorized')
    }

    res.render('media/edit', {
        title: 'Update',
        media: media,
        provider: provider,
        user: req.user 
    })
}

let updateMedia = async(req, res, next) => {

    //for if statement below
    let media = await Media.findById(req.params._id)

    if(req.user.username != media.username){
        return res.redirect('/auth/unauthorized')
    }
    else{
        await Media.findByIdAndUpdate(req.params._id, req.body)
    }

    res.redirect('/media')
}

//make public 
module.exports = {

    index,
    displayCreateForm,
    createMedia,
    deleteMedia,
    displayEditForm,
    updateMedia

}




