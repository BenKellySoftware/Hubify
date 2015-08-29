var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	fs = require('fs'),
	jsonfile = require('jsonfile'),
	util = require('util'),
	DATA = __dirname + '/frontend/DATA.json';

server.listen(process.env.PORT || 3000);

app.use(express.static('frontend'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/frontend/index.html');
});

io.on('connection', function(socket){
	socket.on('Upload Image', function (name, buffer, location) {
		var fileName = __dirname + '/frontend/Images/' + location + "/" + name;
		fs.open(fileName, 'a', 0755, function(err, fd) {
			if (err) throw err;
			fs.write(fd, buffer, null, 'Binary', function(err, written, buff) {
				fs.close(fd, function() {
					console.log('File saved successful!');
				});
			});
		});
	});
	
	socket.on('Post', function (NewPost, i) {
		console.log("Post");
		jsonfile.readFile(DATA, function (err, data) {
			if (err) throw err;
			var obj = data;
			obj.Likes[i].Posts.push(NewPost);
			jsonfile.writeFile(DATA, obj, {spaces: 4}, function(err) {
				if (err) throw err;
			});
		});
	});

	socket.on('Create User', function (NewUser, i) {
		console.log("Create User");
		jsonfile.readFile(DATA, function (err, data) {
			if (err) throw err;
			var obj = data;
			obj.Users.splice(i, 0, NewUser);
			jsonfile.writeFile(DATA, obj, {spaces: 4}, function(err) {
				if (err) throw err;
			});
		});
	});
	
	socket.on('Toggle Hub', function (User, Like, State) {
		console.log("Toggle Hub");
		jsonfile.readFile(DATA, function (err, data) {
			if (err) throw err;
			var obj = data;
			if (State) {
				obj.Users[User].Likes.push(Like);
			}
			else {
				i = obj.Users[User].Likes.indexOf(Like);
				obj.Users[User].Likes.splice(i,1);
			}
			jsonfile.writeFile(DATA, obj, {spaces: 4}, function(err) {
				if (err) throw err;
			});
		});
	});
});