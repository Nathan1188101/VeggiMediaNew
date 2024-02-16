const mongoose = require("mongoose"); 

//define schema for media object
let mediaSchema = new mongoose.Schema({
    type:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    releaseYear: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    provider: {
        type: String, 
        required: true
    },
    rating: {
        type: Number
    },
    username: {
        type: String,
        required: true
    }

});

let Media = mongoose.model('Media', mediaSchema)
module.exports = Media; 