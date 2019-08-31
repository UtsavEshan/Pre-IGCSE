const express = require('express'),
	app = express();

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
	res.send('login for students');
});

app.listen(3000, process.env.IP, function() {
	console.log('port is working');
});