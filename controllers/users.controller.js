const User = require('../models/user.model');

exports.test = (req, res ,next ) => {        
        res.json({ message : 'route working'})
}

exports.register = (req, res ,next ) => {        
        
        if(req.body.name == undefined || req.body.mobile == undefined || req.body.address == undefined){
                res.status(400).json({ message : 'User Validation Failed : name,mobile,address Required'}) 
        }

        let new_user = User({
                name: req.body.name,
                mobile: req.body.mobile,
                address: req.body.address,
                created_at: new Date() ,
                updated_at: new Date()
        });
        
            new_user.save( (err ,result ) => {
                
                if (err) { return next(err)}
                
                data = {
                    data : result,
                    message : 'Category Added Successfully'
                }
                
                res.status(200).json(data)
            })
}



exports.get_all = (req, res ,next ) => {
    
        User.find({} , (err, result) => {
            if(err){ return next(err) }

            res.status(200).json(result)
        });
}

exports.get_single = (req, res ,next ) => {
    
        User.findOne({_id: req.params.id }, (err, result) => {
                if(err){
                        res.status(404).json({ message : 'User Not Found !'}) 
                 }

                data = {
                   data : result
                }      

                res.status(200).json(data)
            });
}
