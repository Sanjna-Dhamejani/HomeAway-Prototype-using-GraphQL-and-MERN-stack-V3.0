var {Booking} = require('../models/booking');
var kafka = require(
    "../kafka/client"
)

module.exports.mytripsdatesearch = function(req,res){
    console.log("Inside post mytripsdatesearch: ",req.params.email)
    console.log("req.body.arrive",req.body.arrive)
    console.log("req.body.depart",req.body.depart)
    Booking.find({
        $or :[
            {
                $and :[
                    {arrival : {$lte : req.body.arrive}},
                    {depart : {$gte :req.body.arrive}}
                ]
            },
            {
                $and :[
                    {arrival : {$lte : req.body.depart}},
                    {depart : {$gte : req.body.depart}}
                ] 
            }
        ]

    }
    ).then((alreadyBooked)=>{
        res.code = "200";
        console.log("Properties searched and matched",alreadyBooked);
        res.send(JSON.stringify(alreadyBooked));
    },(err) => {
        res.code = "400";
        res.send("Bad Request");
    })
     
}


module.exports.mytripsget = function(req,res){
    console.log("inside mytrips email")
    console.log("Inside get for profile: ",req.params.email)
    kafka.make_request('mytrips',req.params, function(err,results){
        console.log('in result');
        console.log("results in my trips ",results);
        if (err){
                        console.log("Inside err");
                        res.json({
                            status:"error",
                            msg:"System Error, Try Again."
                        })
                    }else{
                        res.send(JSON.stringify(results));
                    }
})
    
}

module.exports.odashboard = function(req,res){
    console.log("Inside get for displaying a specific ownerdashboard")
    kafka.make_request('odashboard',req.params, function(err,results){
        console.log('in result');
        console.log("results in odashboard",results);
        if (err){
                        console.log("Inside err");
                        res.json({
                            status:"error",
                            msg:"System Error, Try Again."
                        })
                    }else{
                        res.send(JSON.stringify(results));
                    }
    })
}