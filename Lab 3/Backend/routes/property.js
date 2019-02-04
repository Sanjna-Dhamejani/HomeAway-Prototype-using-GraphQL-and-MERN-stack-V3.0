var {Booking} = require('../models/booking');
var {Properties} = require('../models/property');
var kafka = require(
    "../kafka/client"
)

module.exports.property = function(req,res){
    console.log("Inside Property Post");
    kafka.make_request('property',req.body, function(err,results){
        console.log('in result');
        console.log("results in property ",results);
        if (err){
                console.log("Inside err");
                res.json({
                    status: "error",
                    msg: "Error"
                })
                res.sendStatus(400).end();
            }else{
                console.log("Inside else",results);
                res.sendStatus(200).end();
                    }
                })
           
    }

    module.exports.filter = function(req,res){
        var alreadyBookedArray = [];
        console.log("Inside post filter for listings: ",req.body.uemail)
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
    
        },
        {propertyid : 1, _id : 0}
        ).then((alreadyBooked)=>{
        console.log("alreadyBooked",alreadyBooked)
        for(let i=0; i<alreadyBooked.length;i++){
            alreadyBookedArray.push(alreadyBooked[i].propertyid)
        }
        console.log("alreadyBookedArray",alreadyBookedArray)
        Properties.find(
            {$and :[
               { _id : {$nin : alreadyBookedArray}},
               { city : req.body.destination},
               { pstartdate: { $lte: req.body.arrive } },
               {penddate: { $gte: req.body.depart } },
               { accommodates: { $gte: req.body.guests } },
               { bedrooms : req.body.bedrooms},
               { price : {$lte: req.body.price}}
            ]
        }).then((property)=>{
            res.code = "200";
            console.log("Properties searched and matched",property);
            res.send(JSON.stringify(property));
        },(err) => {
            res.code = "400";
            res.send("Bad Request");
        })
           
    },(err) => {
        res.code = "400";
        res.send("Bad Request Booking");
    })
         
    }
    
    module.exports.home = function(req,res){
        var alreadyBookedArray = [];
        console.log("Inside post search for home: ",req.body.uemail)
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
    
        },
        {propertyid : 1, _id : 0}
        ).then((alreadyBooked)=>{
        console.log("alreadyBooked",alreadyBooked)
        for(let i=0; i<alreadyBooked.length;i++){
            alreadyBookedArray.push(alreadyBooked[i].propertyid)
        }
        console.log("alreadyBookedArray",alreadyBookedArray)
        Properties.find(
            {$and :[
               { _id : {$nin : alreadyBookedArray}},
               { city : req.body.destination},
               { pstartdate: { $lte: req.body.arrive } },
               {penddate: { $gte: req.body.depart } },
               { accommodates: { $gte: req.body.guests } }
            ]
        }).then((property)=>{
            res.code = "200";
            console.log("Properties searched and matched",property);
            res.send(JSON.stringify(property));
        },(err) => {
            res.code = "400";
            res.send("Bad Request");
        })
           
    },(err) => {
        res.code = "400";
        res.send("Bad Request Booking");
    })
         
    };


    
    module.exports.displayprop = function(req,res){
    console.log("Inside Booking Post");
                kafka.make_request('booking',req.body, function(err,results){
                    console.log('in result');
                    console.log("results in booking ",results);
                    if (err){
                                    console.log("Inside err");
                                    res.sendStatus(400).end();
                                }else{
                                                console.log("Inside else",results);
                                                res.sendStatus(200).end();
                                                
                                }
                            })
            
           
    }



module.exports.displaypropget = function(req,res){
console.log("Inside get for pics for propertyID:", req.params.propertyID);
Properties.find({
_id : req.params.propertyID
},
{propertypics : 1, _id : 0}
).then((pics)=>{
 res.code = "200";
 console.log("Pics searched and matched",pics);
 res.send(JSON.stringify(pics));
},(err) => {
 res.code = "400";
 res.send("Bad Request");
})
}