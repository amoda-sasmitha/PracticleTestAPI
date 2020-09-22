const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    name:{
        type:String,
        required : true,
    },
    mobile:{
        type:String,
        required : true,
    },
    address : {
        type:String,
    },
    created_at:{
        type: Date
    },
    updated_at:{
        type: Date
    }
})

module.exports = mongoose.model('users', User );
