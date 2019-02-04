//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var mysql = require('mysql');
var pool = require('./pool');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
var bcrypt = require('bcryptjs');
const port = process.env.PORT || 3001;
const multer = require('multer');
const uuidv4 = require('uuid/v4');
var passport = require('passport');
var kafka = require(
    "./kafka/client"
)
const path = require('path');
const fs = require('fs');
var photostore ="";
var fetchowneremail =""
var requireAuth = passport.authenticate('jwt', {session: false});
var mongoose = require('mongoose');
var {Users} = require('./models/user');
var {Properties} = require('./models/property');
var {Booking} = require('./models/booking');
var {Messages} = require('./models/messages');
var {mongoose} = require('./db/mongoose');
var routes = require('./routes/index');
const alreadyBookedArray = []

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
secret              : 'cmpe273_kafka_passport_mongo',
resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
activeDuration      :  5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());
app.use(passport.initialize());
//Allow Access Control
app.use(function(req, res, next) {
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
res.setHeader('Access-Control-Allow-Credentials', 'true');
res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
res.setHeader('Cache-Control', 'no-cache');
next();
});

require('./config/passport')(passport);
app.use('/', routes);

app.use("/graphql",graphqlHTTP({
    schema,
    graphiql: true
}));



const storage = multer.diskStorage({
destination: (req, file, cb) => {
cb(null, './uploads');
},
filename: (req, file, cb) => {

const newFilename = `${file.originalname}`;
cb(null,  newFilename);
},
});

const upload = multer({ storage });

app.post('/pphotos', upload.single('selectedFile'), (req, res) => {
//console.log("Req : ",req);
//console.log("Res : ",res.file);
console.log("Printing filename",res.req.file.filename)
photostore=res.req.file.filename
console.log("Inside photos Post");
console.log("Posting photos for : ", fetchowneremail)
})



app.post('/profilepic/:email', upload.single('selectedFile'), (req, res) => {
    //console.log("Req : ",req);
    //console.log("Res : ",res.file);
    console.log("Printing filename",res.req.file.filename)
    photostore=res.req.file.filename
    console.log("Inside photos Post user", req.params.email);

    Users.update(
        {email : req.params.email},
        {
            $set : 
            {
                profilepic: photostore
            }
        }
    ).then((user)=>{
        console.log("User updated:", user);
        res.sendStatus(200).end();

    },(err)=>{
                console.log("Error updating User.");
                res.sendStatus(400).end();
            })
})

app.post('/download/:file(*)',(req, res) => {
console.log("Inside download file");
var file = req.params.file;
var fileLocation = path.join(__dirname + '/uploads',file);
var img = fs.readFileSync(fileLocation);
var base64img = new Buffer(img).toString('base64');
res.writeHead(200, {'Content-Type': 'image/jpg' });
res.end(base64img);
});

app.listen(3001);
console.log("Server Listening on port 3001");