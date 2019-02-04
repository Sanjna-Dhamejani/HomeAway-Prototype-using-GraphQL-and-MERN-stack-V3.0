var {Booking} = require('../models/booking');
var {Users} = require('../models/user');
var {Properties} = require('../models/property');
var {Messages} = require('../models/messages');
var isfirst=""
var kafka = require(
    "../kafka/client"
)

module.exports.messagepost = function(req,res){
    console.log("Inside Messages Post");
    kafka.make_request('messagepost',req.body, function(err,results){
        console.log('in result');
        console.log("results in messagepost ",results);
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
           
    // isfirst=req.body.isfirst
    // if(isfirst==true){
    //     var message = new Messages({
    //         temail: req.body.temail,
    //         message: req.body.msg,
    //         oemail: req.body.oemail,
    //         headline: req.body.headline,
    //         state: req.body.state,
    //         city: req.body.city
    //     })
    //     message.save().then((message)=>{
    //         console.log("Message thread created :", message);
    //         res.sendStatus(200).end();
    //     },(err)=>{
    //         console.log("Error creating Messages.");
    //         res.sendStatus(400).end();
    //     })
    // }
    // else{
    //     Messages.findOneAndUpdate(
    //         {
    //             _id: req.body.msgid,
    
    //         },
    //         { $push: { message: req.body.msg }},
    //         { new: true, upsert: true }).then((messages)=>{
    //                 console.log("Messages posted :", messages);
    //                 res.sendStatus(200).end();
    //             },(err)=>{
    //                 console.log("Error creating User.");
    //                 res.sendStatus(400).end();
    //             })  
    //         }
    }

module.exports.gettmsgs = function(req,res){
    console.log("Inside get for displaying Chat History function")
    console.log("req.body.email "+req.body.email)
    console.log("req.body.type "+req.body.type)
    console.log("req.body"+JSON.stringify(req.body))
    kafka.make_request('gettmsgs',req.body, function(err,results){
        console.log('in result');
        console.log("results in gett msgs ",results);
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
// if(req.body.type === "traveler"){
//     Messages.find({
//        temail : req.body.email
//     }).then((messages)=>{
//         res.code = "200";
//         console.log("Messages searched and matched",messages);
//         res.send(JSON.stringify(messages));
//     },(err) => {
//         res.code = "400";
//         res.send("Bad Request");
//     })
// }
// else{
//     Messages.find({
//         oemail : req.body.email
//      }).then((messages)=>{
//          res.code = "200";
//          console.log("Messages searched and matched",messages);
//          res.send(JSON.stringify(messages));
//      },(err) => {
//          res.code = "400";
//          res.send("Bad Request");
//      })
// }
}


module.exports.allmsgs = function(req,res){
    // console.log("Inside get for displaying All messages")
    // Messages.find({
    //    _id : req.params.id
    // }).then((messages)=>{
    //     res.code = "200";
    //     console.log("Messages searched and matched",messages);
    //     res.send(JSON.stringify(messages));
    // },(err) => {
    //     res.code = "400";
    //     res.send("Bad Request");
    // })

    console.log("Inside get for allmsgs: ",req.params.email)
    kafka.make_request('allmsgs',req.params, function(err,results){
        console.log('in result');
        console.log("results in all msgs ",results);
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
