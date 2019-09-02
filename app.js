const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	mongoose = require('mongoose');
// passport = require('passport'),
// LocalStrategy = require('passport-local'),

// ===========Schema setup====Schema is what allows mongodb to store data in the db, it is required for mongodb to work======
const postSchema = new mongoose.Schema({
	head: String,
	subhead: String,
	desc: String
});

const post = mongoose.model('post', postSchema);  //ALLOWS ROUTES TO ACCES SCHEMA AS A CONSTANT

mongoose.connect('mongodb://localhost:27017/igcse', { useNewUrlParser: true }); //Allows you to connect ot the db
app.use(bodyParser.urlencoded({ extended: true })); // allows you to transport information
app.set('view engine', 'ejs'); //makes it so that you don't have to write .ejs at the end of your file every time
app.use(express.static(__dirname + '/public')); //makes css work
app.use(methodOverride('_method'));
//=============================================
//home route
app.get('/', function (req, res) {
	res.render('index');
});
//GET ROUTE  post
app.get('/posts', function (req, res) {
	post.find({}, function (err, allposts) {
		if (err) {
			console.log(err);
		} else {
			res.render('Posts', { posts: allposts }); //LETS YOU PASS DATA TO THE FILE
		}
	});
});
// POST ROUTE POST============================
app.post('/posts', function (req, res) {
	const head = req.body.head;
	const subhead = req.body.subhead;
	const desc = req.body.desc;
	const newpost = { head: head, subhead: subhead, desc: desc };  //PASS EACH ITEM SPERARTELY BECAUSE IT HAS TO RETRIEVE DATA FROM THE FORM AND THEN CREATE A NEW POST
	post.create(newpost, function (err, newlyCreated) {
		if (err) {
			console.log(err);
		} else {
			//redirect back to posts page
			res.redirect('/posts');
		}
	});
});
//================================
//GET ROUTE
app.get('/posts/new', function (req, res) {
	res.render('newpost');
});
app.get('/posts/:id', function (req, res) {
	post.findById(req.params.id, function (err, foundpost) {
		if (err) {
			console.log(err);
		} else {
			res.render('show', { post: foundpost });
		}
	});
});
// //=======DELETE ROUTE================
// app.post('/posts/:id', function(req, res) {
// 	post.findByIdAndDelete(req.params.id, function(err) {
// 		if (err) {
// 			res.redirect('/posts');
// 		} else {
// 			res.redirect('/posts');
// 		}
// 	});
// });

//=========edit route===============
app.get('/posts/:id/edit', function (req, res) {
	post.findById(req.params.id, function (err, foundpost) {
		res.render('edit', { post: foundpost });
	});
});

// UPDATE post ROUTE
app.put('/posts/:id', function (req, res) {
	// find and update the correct post
	post.findByIdAndUpdate(req.params.id, req.body.post, function (err, updatedpost) {
		if (err) {
			res.redirect('/posts');
		} else {
			//redirect somewhere(show page)
			res.redirect('/posts/' + req.params.id);
		}
	});
});

// GET ROUTE
app.get('/students', function (req, res) {
	res.render('students');
});
// =====GET ROUTE
app.get('/login', function (req, res) {
	res.render('login');
});

app.listen(3000, process.env.IP, function () {
	console.log('port is working');
});
