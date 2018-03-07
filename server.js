
var express = require("express");
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require("path");

// create the express app
var app = express();

app.use(session({
    secret: 'counter_secret', 
    saveUninitialized: true,
    resave: true
}));

app.use(bodyParser.urlencoded({ extended: true }));

// static content
app.use(express.static(path.join(__dirname, "./static")));

// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// root route to render the index.ejs view
app.get('/', function(req, res) {

    if(!req.session.name) req.session.name = '';
    if(!req.session.location) req.session.location = '';
    if(!req.session.language) req.session.language = '';
    if(!req.session.comment) req.session.comment = '';

    res.render("index");
});

app.post('/process_form', function(req, res) {
    
    req.session.name = req.body.full_name;
    req.session.location = req.body.location;
    req.session.language = req.body.language;
    req.session.comment = req.body.comment;

    res.redirect('/result');
});

app.get('/result', function(req, res) {

    res.render("results", {name: req.session.name, location: req.session.location, language: req.session.language, comment: req.session.comment});
});

// tell the express app to listen on port 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});