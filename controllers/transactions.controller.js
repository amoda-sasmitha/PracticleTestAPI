const Transaction = require('../models/transaction.model');
const User = require('../models/user.model');

exports.test = (req, res ,next ) => {        
        res.json({ message : 'route working'})
}


exports.create = async (req, res ,next ) => {        
        
        if(req.body.from_mobile == undefined || req.body.to_mobile == undefined || req.body.amount == undefined){
                res.status(400).json({ message : 'User Validation Failed : from_mobile , to_mobile, amount Required !'}) 
        }

        const to_user =  await User.findOne({ mobile : req.body.to_mobile });
        const from_user =  await User.findOne({ mobile : req.body.from_mobile });
        
        //validate receiver
        if(to_user == null ){
                res.status(400).json({ message : 'Receiver Not Found !'}) 
        }
        
        //validate sender
        if(from_user == null ){
                res.status(400).json({ message : 'Sender Not Found !'}) 
        }

        let new_transaction = Transaction({
                mobile: req.body.from_mobile,
                from: from_user._id,
                to: to_user._id,
                amount :  req.body.amount ,
                created_at: new Date() ,
                updated_at: new Date()
        });

        new_transaction.save( (err ,result ) => {
                
                if (err) { return next(err)}
                
                data = {
                    data : result,
                    message : 'Transaction Added Successfully !'
                }
                
                res.status(200).json(data)
            })
        
}


exports.getall_transactions = async (req, res ,next ) => {
    
        const user =  await User.findOne({ mobile : req.params.mobile });
        
        //validate user
        if(user == null ){
                res.status(400).json({ message : 'User Not Found !'}) 
        }

        const options = { $or: [ { 'from': user._id },{ 'to': user._id }]}


        Transaction.aggregate([
                { $match : options },
                {
                $lookup: {
                    from: "users", // collection name in db
                    localField: "from",
                    foreignField: "_id",
                    as: "from"
                } },{
                $lookup: {
                    from: "users", // collection name in db
                    localField: "to",
                    foreignField: "_id",
                    as: "to"
                }}
                ,
                { $project : { 
                    created_at : 1 ,   
                    amount : 1 ,
                    from : { $arrayElemAt : [ "$from" , 0 ] } ,
                    to : { $arrayElemAt : [ "$to" , 0 ] } 
                }}
            ])
            .exec(function(err, result) {
                if (err) { return next(err)}
                res.status(200).json(result)
            });

}


exports.get_in_transactions = async (req, res ,next ) => {
    
        const user =  await User.findOne({ mobile : req.params.mobile });
        
        //validate user
        if(user == null ){
                res.status(400).json({ message : 'User Not Found !'}) 
        }

        const options = { $or: [ { 'to': user._id }]}


        Transaction.aggregate([
                { $match : options },
                {
                $lookup: {
                    from: "users", // collection name in db
                    localField: "from",
                    foreignField: "_id",
                    as: "from"
                } },{
                $lookup: {
                    from: "users", // collection name in db
                    localField: "to",
                    foreignField: "_id",
                    as: "to"
                }}
                ,
                { $project : { 
                    created_at : 1 ,   
                    amount : 1 ,
                    from : { $arrayElemAt : [ "$from" , 0 ] } ,
                    to : { $arrayElemAt : [ "$to" , 0 ] } 
                }}
            ])
            .exec(function(err, result) {
                if (err) { return next(err)}
                res.status(200).json(result)
            });

}

exports.get_out_transactions = async (req, res ,next ) => {
    
        const user =  await User.findOne({ mobile : req.params.mobile });
        
        //validate user
        if(user == null ){
                res.status(400).json({ message : 'User Not Found !'}) 
        }

        const options = { $or: [ { 'from': user._id }]}


        Transaction.aggregate([
                { $match : options },
                {
                $lookup: {
                    from: "users", // collection name in db
                    localField: "from",
                    foreignField: "_id",
                    as: "from"
                } },{
                $lookup: {
                    from: "users", // collection name in db
                    localField: "to",
                    foreignField: "_id",
                    as: "to"
                }}
                ,
                { $project : { 
                    created_at : 1 ,   
                    amount : 1 ,
                    from : { $arrayElemAt : [ "$from" , 0 ] } ,
                    to : { $arrayElemAt : [ "$to" , 0 ] } 
                }}
            ])
            .exec(function(err, result) {
                if (err) { return next(err)}
                res.status(200).json(result)
            });

}