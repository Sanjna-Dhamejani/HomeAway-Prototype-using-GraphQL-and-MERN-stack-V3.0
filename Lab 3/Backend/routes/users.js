var {Users} = require('../models/user');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtkey = require('../config/keys');
var kafka = require(
    "../kafka/client"
)


module.exports.signup = function(req,res){
    console.log("Inside Signup Post");
    var salt = bcrypt.genSaltSync(10);
    var encryptedpassword = bcrypt.hashSync(req.body.password, salt);
    properemail = (req.body.email).replace("%40", "@")
    console.log("Inside Signup Post for email:", properemail);
    Users.findOne({
        email : properemail
        }, function(err,user){
            if (err) {
                console.log("err",err)
                checkemail = "400";}
                else if(user == null){
                console.log("Checking sb's method", user)
                var user = new Users({
                    email : properemail,
                    password : encryptedpassword,
                    firstname : req.body.firstname,
                    lastname : req.body.lastname,
                    usertype : req.body.usertype,
                    profilepic : "default.png"
                })
                console.log("Signup user",user)
                user.save().then((user)=>{
                    console.log("User created :", user);
                    res.sendStatus(200).end();
                },(err)=>{
                    console.log("Error creating User.");
                    res.sendStatus(400).end();
                })
            
            } else if(user){
                checkemail= "202";
                console.log("checkemail",checkemail);
                console.log("Signup printing user:",user)
                res.sendStatus(202).end();
            }
        })
    
    }

    module.exports.login = function(req,res){
        console.log("Inside Login Post Request");
        properemail = (req.body.email).replace("%40", "@")
        console.log("Setting up login for :", properemail);
        Users.findOne({
        email : properemail
        }, function(err,user){
            if (err) {
                res.code = "400";
                res.value = "The email and password you entered did not match our records. Please double-check and try again.";
                console.log(res.value);
                res.sendStatus(400).end(); 
            }
            else if(user.password){
                bcrypt.compare(req.body.password, user.password, function(err, results) {
                    console.log('Input password ', req.body.password)
                    console.log('Password in DB ', user.password)
             if(results ){
                
                res.code = "200";
                res.value = user;
                req.session.user = user;
                res.cookie('cookie',properemail,{maxAge: 900000, httpOnly: false, path : '/'});
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                jwt.sign({ user: user }, jwtkey.secret, { expiresIn: '10080s' }, (err, token) => {
                    console.log("token" + token)
                    var values = {
                        token: 'JWT ' + token
                    }
                    res.end(JSON.stringify(values))
                });
                }
                });
             }
        
        })
        
        }

        module.exports.profile = function(req,res){
             console.log("Inside Profile Update");
            // uproperemail = (req.body.uemail).replace("%40", "@")
            // console.log("Updating profile for : ", uproperemail)
            kafka.make_request('profilepost',req.body, function(err,results){
                console.log('in result');
                console.log("results in index ",results);
                if (err){
                                console.log("Inside err");
                                res.json({
                                    status:"error",
                                    msg:"System Error, Try Again."
                                })
                            }else{
                                            console.log("Inside else",results);
                                            
                            }
                        })
        
            }

            module.exports.profileget = function(req,res){
                console.log("Inside get for profile: ",req.params.email)
                kafka.make_request('profileget',req.params, function(err,results){
                    console.log('in result');
                    console.log("results in index ",results);
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

    

            
    