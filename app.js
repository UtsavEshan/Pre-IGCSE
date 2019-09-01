const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');
// passport = require('passport'),
// LocalStrategy = require('passport-local'),
// methodOverride = require('method-override');

// const posts = [
// 	{
// 		head: 'Biology',
// 		subhead: 'CW',
// 		desc:
// 			'Quis sit pariatur dolor elit deserunt enim. Ex eu aliquip excepteur nulla cillum pariatur. Proident irure consequat et dolor exercitation enim ad. Ullamco dolor id qui amet. Sunt quis irure elit commodo qui Lorem cillum est cupidatat velit irure et nostrud'
// 	}
// ];

// ===========Schema setup==========
const postSchema = new mongoose.Schema({
	head: String,
	subhead: String,
	desc: String
});

const post = mongoose.model('post', postSchema);
// post.create(
// 	{
// 		head: 'ICT',
// 		subhead: 'CW',
// 		desc:
// 			'Quis sit pariatur dolor elit deserunt enim. Ex eu aliquip excepteur nulla cillum pariatur. Proident irure consequat et dolor exercitation enim ad. Ullamco dolor id qui amet. Sunt quis irure elit commodo qui Lorem cillum est cupidatat velit irure et nostrud'
// 	},
// 	function(err, post) {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log('post created!!!');
// 			console.log(post);
// 		}
// 	}
// );

mongoose.connect('mongodb://localhost:27017/igcse', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/posts', function(req, res) {
	post.find({}, function(err, allposts) {
		if (err) {
			console.log(err);
		} else {
			res.render('Posts', { posts: allposts });
		}
	});
});

app.post('/posts', function(req, res) {
	const head = req.body.head;
	const subhead = req.body.subhead;
	const desc = req.body.desc;
	const newpost = { head: head, subhead: subhead, desc: desc };
	post.create(newpost, function(err, newlyCreated) {
		if (err) {
			console.log(err);
		} else {
			//redirect back to campgrounds page
			res.redirect('/posts');
		}
	});
});

app.get('/posts/:id', function(req, res) {
	res.render('show');
});

app.get('/posts/new', function(req, res) {
	res.render('newpost');
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
