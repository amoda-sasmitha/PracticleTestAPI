const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Transaction = new Schema({
    mobile:{
        type:String,
        required : true,
    },
    from :{
        type: Schema.ObjectId,
        required : true,
    },
    to :{
        type: Schema.ObjectId,
        required : true,
    },
    amount:{
        type : Number ,
        required : true,
    },
    created_at:{
        type: Date
    },
    updated_at:{
        type: Date
    }
})

module.exports = mongoose.model('transactions', Transaction );
