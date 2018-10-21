//import express module
var express = require('express');
//create an express app
var app = express();
//require express middleware body-parser
var bodyParser = require('body-parser');
//require express session
var session = require('express-session');
//require cookie-parser
var cookieParser = require('cookie-parser');

var cors = require('cors');

//set the view engine to ejs
app.set('view engine', 'ejs');
//set the directory of views
app.set('views', './views');
//specify the path of static directory
app.use(express.static(__dirname + './public'));

app.use(cors({origin: null, credentials: true}));

//allow access control
app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});
//use body parser to parse JSON and urlencoded request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//use cookie-parser to parse request headers
app.use(cookieParser());

//use session to store user data between HTTP requests
app.use(session({
    secret: 'cmpe280_secure_string',
    resave: false,
    saveUninitialized: true
}));

//route to display the demographics tab
app.get('/demographics', function(req,res){
    res.redirect('/');
});

//route to create the patient
app.post('/createPatient', function(req,res){
    var newPatient = {firstName: req.body.fName, lastName: req.body.lName, gender: req.body.gender, age: req.body.age};
    res.json({success: "Done, created user", details: newPatient});
});

//route to display the health vitals tab
app.get('/healthVitals', function(req,res){
    res.redirect('/healthVitals');
});

//route to update the patient
app.post('/update', function(req, res){

});
//route to fetch the patient details from the DB and display it
app.get('/reports', function(req, res){

});

app.get('/', function(req, res){
    res.end("Nothing to see here!");
});

//express js server listening on 3000
app.listen(3001);
console.log(" Server listening on port 3001.");
