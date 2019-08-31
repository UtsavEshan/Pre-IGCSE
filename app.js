const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');
// passport = require('passport'),
// LocalStrategy = require('passport-local'),
// methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/igcse', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/posts', function(req, res) {
	res.render('Posts');
});

app.get('/students', function(req, res) {
	res.render('students');
});

app.get('/login', function(req, res) {
	res.render('login');
});

app.listen(3000, process.env.IP, function() {
	console.log('port is working');
});
