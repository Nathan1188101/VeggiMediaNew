const mongoose = require("mongoose")

let providerSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },

})

let Provider = mongoose.model('Provider', providerSchema)
module.exports = Provider; 